import json
import boto3
import os
from botocore.client import Config
import mimetypes
from mimetypes import MimeTypes


def lambda_handler(event, context):
    
    print("Received event: " + json.dumps(event,indent=2))
    print(len(event))
    
    if len(event) < 1:
        return 'Error: payload empty'
    
    
    try:
        s3 = boto3.resource('s3', config=Config(signature_version='s3v4'))
    
        deploy_bucket = s3.Bucket(os.environ['DEPLOY_BUCKET'])
        
        questions = '/tmp/questions.json'
        filename = "questions.json"
        
        
        with open(questions, 'w') as outfile:
            json.dump(event, outfile)
       
        ftype, encoding = MimeTypes().guess_type(questions)
        conType = ftype if ftype is not None else encoding if encoding is not None else 'text/plain'    
        
        
        with open(questions, 'rb') as data:
            deploy_bucket.upload_fileobj(data, filename, ExtraArgs={'ContentType': conType})
            deploy_bucket.Object(filename).Acl().put(ACL='public-read')