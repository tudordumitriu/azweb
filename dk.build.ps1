param (
    [string]$version = 'v10',
    [string]$apiUrl = 'http://localhost:30643/',
    [string]$appName = 'azweb'
)

write-output "Building version: $version"

write-output "Files: Creating a backup of package.json"
Get-Content .\package.json | Set-Content .\packageBack.json
write-output "Files: Rewriting the api url"
(Get-Content .\package.json).replace('{apiurl}', $apiUrl) | Set-Content .\package.json

$Command = "docker build -t tudordumitriu/azweb:$version ."
write-output "Docker: Executing $Command"
Invoke-Expression $Command

$Command = "docker push tudordumitriu/azweb:$version"
write-output "Docker: Executing $Command"
Invoke-Expression $Command

write-output "K8S: Executing kubectl apply ..."
(Get-Content .\deployment.yaml).replace('{version}', $version) | Set-Content .\deploymentTemp.yaml

kubectl apply -f .\deploymentTemp.yaml
# $rolloutStatus = (kubectl rollout status deployment $appName) | Out-String
# Write-Host $rolloutStatus

IF (-Not (kubectl rollout status deployment $appName)) {
    kubectl rollout undo deployment $appName
    kubectl rollout status deployment $appName    
}

write-output "Files: Deleting deploymentTemp.yaml"
Remove-Item –path .\deploymentTemp.yaml
write-output "Files: Restoring package.json"
Get-Content .\packageBack.json | Set-Content .\package.json
