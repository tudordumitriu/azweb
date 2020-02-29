param (
    [string]$version = 'v10',
    [string]$apiUrl = 'http://localhost:30643/'
)

write-output "Building version: $version"

write-output "Creating a backup of package.json"
Get-Content .\package.json | Set-Content .\packageBack.json
write-output "Rewriting the api url"
(Get-Content .\package.json).replace('{apiurl}', $apiUrl) | Set-Content .\package.json

$Command = "docker build -t tudordumitriu/azweb:$version ."
write-output "Executing $Command"
Invoke-Expression $Command

$Command = "docker push tudordumitriu/azweb:$version"
write-output "Executing $Command"
Invoke-Expression $Command

write-output "Executing kubectl apply ..."
(Get-Content .\deployment.yaml).replace('{version}', $version) | Set-Content .\deploymentTemp.yaml
kubectl apply -f .\deploymentTemp.yaml
Remove-Item –path .\deploymentTemp.yaml

write-output "Restoring package.json"
Get-Content .\packageBack.json | Set-Content .\package.json
