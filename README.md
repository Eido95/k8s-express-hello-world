# Components

- K8s cluster: minikube
- Container registry: Docker Hub

# Overview

To create and deploy a "Hello World" Express.js app to Kubernetes (k8s), you'll need to follow a few steps. Here's a high-level overview of the process:

1. Set up your development environment:
   - Install Node.js and npm (Node Package Manager) on your machine.
   - Install Docker to build container images.

2. Create an Express.js app:
   - Initialize a new Node.js project: Run `npm init` in a new directory and follow the prompts.
   - Install Express.js as a dependency: Run `npm install express`.
   - Create an `index.js` file with the following code:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
```

3. Dockerize the Express.js app:
   - Create a `Dockerfile` in the project directory with the following content:

```dockerfile
# Use the official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Define the command to run the app when the container starts
CMD [ "node", "index.js" ]
```

4. Build and push the Docker image:
   - `cd k8s-express-hello-world` (innermost directory)
   - Build the Docker image: Run `docker build -t <Docker ID>/k8s-express-hello-world:latest .` in the project directory.
   - `docker login`
   - Push the image to Docker Hub container registry using `docker push <Docker ID>/k8s-express-hello-world:latest`.

5. Set up a Kubernetes cluster:
   - Install and configure a Kubernetes Minikube cluster (or k3s, or a managed Kubernetes service such as Google Kubernetes Engine (GKE), Amazon Elastic Kubernetes Service (EKS), or Azure Kubernetes Service (AKS)).

6. Create Kubernetes deployment and service files:
   - https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
   - Create a file named `deployment.yaml`.
   - Create a file named `service.yaml`.

7. Deploy the app to Kubernetes:
   - Apply the deployment and service files: Run `kubectl apply -f deployment.yaml` and `kubectl apply -f service.yaml`.

8. Verify the deployment:
   - Run `kubectl get deployments` to check the status of the deployment.
   - Run `kubectl get services` to get the external IP address of the service.

9. Access deployed application:
   - Run `minikube service k8s-express-hello-world-service` 🎉