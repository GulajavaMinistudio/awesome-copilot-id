$path = 'd:\WebstormProject\awesome-copilot-id\README.md'
$bytes = [System.IO.File]::ReadAllBytes($path)
$utf8 = New-Object System.Text.UTF8Encoding $false
$text = $utf8.GetString($bytes)
$lines = $text -split "`r?`n"
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'BYOK Copilot Config') {
        $lineContent = $lines[$i]
        Write-Output ('Line ' + ($i + 1) + ': ' + $lineContent)
        $byteArr = $utf8.GetBytes($lineContent)
        $hex = ''
        foreach ($b in $byteArr) {
            $hex += ('{0:X2} ' -f $b)
        }
        Write-Output ('  Bytes: ' + $hex)
    }
}
