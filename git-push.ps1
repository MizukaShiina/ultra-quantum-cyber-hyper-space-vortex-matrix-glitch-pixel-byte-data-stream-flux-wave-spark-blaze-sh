$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

git rev-parse --show-toplevel *> $null
if ($LASTEXITCODE -ne 0) {
    throw "This script must be run inside a Git repository."
}

$branch = git branch --show-current
if ([string]::IsNullOrWhiteSpace($branch)) {
    throw "The current Git branch could not be determined."
}

git add -A

$stagedChanges = git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "No changes to commit."
    exit 0
}

$message = Read-Host "Commit message"
if ([string]::IsNullOrWhiteSpace($message)) {
    throw "A commit message is required."
}

git commit -m $message
git push origin $branch

Write-Host "Pushed $branch successfully."