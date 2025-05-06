# serverless-meter

This repository is a continuation of work on my bachelors testing. 
Main repo: https://github.com/Gallenmar/serverless-testing

The application adopts a fully serverless, edge-optimized architecture. All of the React+TypeScript UI assets—bundled by Vite—are published to an S3 bucket and delivered globally through a CloudFront distribution for low-latency caching. Dynamic requests hit an AWS API Gateway endpoint, which routes traffic into a set of AWS Lambda functions that implement aplication logic. Those Lambdas, in turn, read and write data to a Turso database—a lightweight, globally distributed SQL store—ensuring fast, strongly consistent access.
