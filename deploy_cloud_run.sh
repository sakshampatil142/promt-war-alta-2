#!/bin/bash
set -e

echo "=========================================================="
echo "🚀 LifeBridge Google Cloud Run Deployment Script"
echo "=========================================================="

if ! command -v gcloud &> /dev/null; then
    echo "❌ 'gcloud' CLI is not found on your system."
    echo ""
    echo "To deploy directly without installing anything:"
    echo "1. Go to Google Cloud Shell in your browser:"
    echo "   👉 https://shell.cloud.google.com"
    echo "2. Upload or clone your project repository."
    echo "3. Run:"
    echo "   gcloud run deploy lifebridge --source . --region us-central1 --allow-unauthenticated"
    echo ""
    echo "To install gcloud locally on macOS:"
    echo "   brew install --cask google-cloud-sdk"
    exit 1
fi

PROJECT_ID=$(gcloud config get-value project 2>/dev/null || echo "")

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "(unset)" ]; then
    read -p "Enter your Google Cloud Project ID: " PROJECT_ID
    gcloud config set project "$PROJECT_ID"
fi

echo "📦 Deploying LifeBridge to Google Cloud Run (Project: $PROJECT_ID, Region: us-central1)..."

gcloud run deploy lifebridge \
    --source . \
    --region us-central1 \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --memory 1Gi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 5

echo ""
echo "=========================================================="
echo "✅ Deployed successfully! Copy the Service URL above and paste it into:"
echo "   'Deployed Link - (Cloud run URL)'"
echo "=========================================================="
