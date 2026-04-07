"""
Clarity Connection Test Tool
Tests the connection to Microsoft Clarity's Data Export API.

Usage:
    python tools/clarity_connect.py

Requires:
    MS_CLARITY_API_TOKEN set in .env
"""

import sys
import os
from dotenv import load_dotenv
import clarity_api

load_dotenv()

def test_connection():
    token = os.getenv("MS_CLARITY_API_TOKEN")

    if not token or token == "your_token_here":
        print("ERROR: MS_CLARITY_API_TOKEN is not set in .env")
        print("Go to your Clarity project → Settings → Data Export → Generate new API token")
        sys.exit(1)

    client = clarity_api.Api(url="https://www.clarity.ms", token=token)
    print("Connecting to Microsoft Clarity...")

    data = client.get_data_export(number_of_days=1, dimension_1="Browser")

    if data.error:
        print(f"ERROR: {data.status_code} - {data.error}")
        sys.exit(1)

    print(f"Status: {data.status_code}")
    print(f"Connection successful!")
    print(f"Response preview:")
    print(data.json_output)

if __name__ == "__main__":
    test_connection()
