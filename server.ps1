$port = 8080
$root = "c:\Users\Utilizador\Documents\GitHub\dwdgchallenge"
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $port)
$listener.Start()

Write-Host "Server listening on http://*:$port/"
Write-Host "Press Ctrl+C to stop."

try {
    while ($true) {
        if ($listener.Pending()) {
            $client = $listener.AcceptTcpClient()
            $stream = $client.GetStream()
            $stream.ReadTimeout = 1000 # 1 second timeout

            
            # Read request (basic)
            $buffer = New-Object byte[] 4096
            $bytesRead = 0
            try {
                $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
            }
            catch {
                # Timeout or validation error, close connection
            }
            if ($bytesRead -gt 0) {
                $requestData = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $bytesRead)
            
                if ($requestData.Length -gt 0) {
                    # Parse GET line
                    $lines = $requestData -split "\r\n"
                    $getLine = $lines[0] # GET /index.html HTTP/1.1
                    $parts = $getLine -split " "
                
                    if ($parts[0] -eq "GET") {
                        $urlVal = $parts[1]
                        if ($urlVal -eq "/") { $urlVal = "/index.html" }
                    
                        $localPath = $urlVal.TrimStart('/').Replace('/', '\')
                        $fullPath = Join-Path $root $localPath
                        $fullPath = $fullPath.Split('?')[0] # Remove query strings

                    
                        if (Test-Path $fullPath -PathType Leaf) {
                            $fileBytes = [System.IO.File]::ReadAllBytes($fullPath)
                            $ext = [System.IO.Path]::GetExtension($fullPath)
                        
                            $contentType = "text/html"
                            switch ($ext) {
                                ".css" { $contentType = "text/css" }
                                ".js" { $contentType = "application/javascript" }
                                ".png" { $contentType = "image/png" }
                                ".jpg" { $contentType = "image/jpeg" }
                                ".mp4" { $contentType = "video/mp4" }
                            }
                        
                            $header = "HTTP/1.1 200 OK`r`n" +
                            "Content-Type: $contentType`r`n" +
                            "Content-Length: $($fileBytes.Length)`r`n" +
                            "Connection: close`r`n`r`n"
                        
                            $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                            $stream.Write($headerBytes, 0, $headerBytes.Length)
                            $stream.Write($fileBytes, 0, $fileBytes.Length)
                        }
                        else {
                            $msg = "404 Not Found"
                            $header = "HTTP/1.1 404 Not Found`r`n" +
                            "Content-Length: $($msg.Length)`r`n" +
                            "Connection: close`r`n`r`n$msg"
                            $hBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                            $stream.Write($hBytes, 0, $hBytes.Length)
                        }
                    }
                }
            }
            $client.Close()
        }
        else {
            Start-Sleep -Milliseconds 100
        }
    }
}
finally {
    $listener.Stop()
}
