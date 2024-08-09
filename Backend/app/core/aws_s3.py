import boto3
import os
from dotenv import load_dotenv

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_S3_BUCKET_NAME = os.getenv("AWS_S3_BUCKET_NAME")

s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)

def upload_file_to_s3(file_name, object_name=None):
    if object_name is None:
        object_name = file_name
    try:
        response = s3_client.upload_file(file_name, AWS_S3_BUCKET_NAME, object_name)
    except Exception as e:
        print(f"Error uploading file to S3: {e}")
        return None
    return object_name
