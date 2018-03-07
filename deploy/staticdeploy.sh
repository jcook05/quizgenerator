#!/bin/bash
set -eu

echo "Deploying static assets"


## Add static hosting bucket and asset bucket (to store questions.json)
BUCKET_NAME="your.s3bucket.name"
ASSET_BUCKET_NAME="bucket.tostore.questions"


aws s3 sync --acl 'public-read' --delete ../static/ "s3://${BUCKET_NAME}/"

aws s3 sync --acl 'public-read'  ../questions/ "s3://${ASSET_BUCKET_NAME}/"



