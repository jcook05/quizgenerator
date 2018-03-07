Javascript Quiz Generator
json driven javascript quiz and quiz generator. Ideal for a standalone website on AWS S3. This quiz is certainly a work in progress, there is definitely room for improvement. At some point I will update to allow for multiple answers. However, as it stands now this quiz is good for setting up study guides. Coupled with AWS S3 you can have a study guide to help you or your kids study in a matter of minutes.

To run via AWS S3 Static Hosting

Create an S3 bucket to host the static site.    Update the /deploy/staticdeploy.sh BUCKET_NAME to your new S3 bucket

Update the Properties/Static Website Hosting. Set index.html as the index document and and error.html as the error document.

Publicly Accessible site: Upload the contents of this repository and set all documents as publicly readable. Use the staticdeploy.sh or the below python put_pub_object method.   

Site accessible by your router IP address range only: Upload the contents of this repository and ensure all objects are set to readable by owner only. Set bucket policy to restrict access to only your router range of IP addresses. See policy below for an example.


Config:

Update the /static/js/config.js file to reflect your environment.  


Deploy:

staticdeploy.sh will deploy static assets to your website S3 bucket and questions.json to a separate S3 bucket. 


Setup CICD and you will have your changes uploaded rapidly. Touch base with me if you want to discuss.

Python functions:

Put a public object:

"""Method to put an object with a public read ACL.""" def put_pub_object(self, filepath, filename, bucket):

    s3 = boto3.resource('s3')


    
    try:                 
        data = open(filepath, 'rb')
        ftype, encoding = MimeTypes().guess_type(filepath)
        conType = ftype if ftype is not None else encoding if encoding is not None else 'text/plain'    
        s3.Object(bucket, filename).put(Body=data,ContentType=conType,ACL='public-read')
    except ClientError as err:
        print("Failed to upload artefact to S3.\n" + str(err))
        return False
    except IOError as err:
        print("Failed to access artefact in this directory.\n" + str(err))
        return False   
    return True
Put a private object

"""Method to put an object with a public read ACL.""" def put_private_object(self, filepath, filename, bucket):

    s3 = boto3.resource('s3')


    
    try:                 
        data = open(filepath, 'rb')
        ftype, encoding = MimeTypes().guess_type(filepath)
        conType = ftype if ftype is not None else encoding if encoding is not None else 'text/plain'    
        s3.Object(bucket, filename).put(Body=data,ContentType=conType,ACL='private')
    except ClientError as err:
        print("Failed to upload artefact to S3.\n" + str(err))
        return False
    except IOError as err:
        print("Failed to access artefact in this directory.\n" + str(err))
        return False   
    return True
Bucket Policy

{ "Version": "2012-10-17", "Id": "S3PolicyId1", "Statement": [ { "Sid": "IPAllow", "Effect": "Allow", "Principal": "*", "Action": "s3:GetObject", "Resource": "arn:aws:s3:::your.bucketname.com/*", "Condition": { "IpAddress": { "aws:SourceIp": "your.router.ip.range/32" } } } ] }

