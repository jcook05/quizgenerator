#!/bin/bash
set -eu

echo "Deploying static assets"

BUCKET_NAME="studyguide.managedcicd.com"
ASSET_BUCKET_NAME="newquizassets"


aws s3 sync --acl 'public-read' --delete ../static/ "s3://${BUCKET_NAME}/"

#aws s3 sync --acl 'public-read'  ../js/ "s3://${ASSET_BUCKET_NAME}/"
aws s3 sync --acl 'public-read'  ../questions/ "s3://${ASSET_BUCKET_NAME}/"



