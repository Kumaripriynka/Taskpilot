# Rename all .js files to .jsx except api.js
$files = Get-ChildItem -Path "src" -Include "*.js" -Recurse -File | Where-Object { $_.Name -ne "api.js" }

foreach ($file in $files) {
    $newName = $file.FullName -replace '\.js$', '.jsx'
    if (Test-Path $newName) {
        Write-Host "Skipping $($file.Name) - .jsx version already exists"
    } else {
        Move-Item -Path $file.FullName -Destination $newName
        Write-Host "Renamed: $($file.Name) -> $($newName | Split-Path -Leaf)"
    }
}
