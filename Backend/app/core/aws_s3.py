import boto3
import os
from dotenv import load_dotenv


load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_S3_BUCKET_NAME = os.getenv("AWS_S3_BUCKET_NAME")
AWS_REGION = os.getenv("AWS_REGION")


s3_client = boto3.client(
    's3',
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

def upload_file_to_s3(file_content, file_name, user_id, bucket_name=AWS_S3_BUCKET_NAME):
    """
    Upload a file to an S3 bucket, organizing files by user ID.

    :param file_content: The content of the file to upload.
    :param file_name: The name of the file to be stored in the bucket.
    :param user_id: The ID of the user, used to create a 'folder' in the bucket.
    :param bucket_name: The S3 bucket name.
    :return: The URL of the uploaded file.
    """
   
    key = f"{user_id}/{file_name}"
    
    try:
        s3_client.put_object(Bucket=bucket_name, Key=key, Body=file_content)
        file_url = f"https://{bucket_name}.s3.{AWS_REGION}.amazonaws.com/{key}"
        return file_url
    except Exception as e:
        print(f"Error uploading file to S3: {e}")
        return None

def upload_file_to_s3(file: UploadFile, filename: str):
    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
    )

    try:
        s3.upload_fileobj(file.file, os.getenv("AWS_BUCKET_NAME"), filename)
        file_url = f"https://{os.getenv('AWS_BUCKET_NAME')}.s3.amazonaws.com/{filename}"
        return file_url
    except NoCredentialsError:
        return {"error": "Credentials not available"}