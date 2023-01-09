$(npm bin)/nx run sdk:package --skip-nx-cache
$(npm bin)/nx run custom-template-extension:package --skip-nx-cache
$(npm bin)/nx run content-extension:package --skip-nx-cache
$(npm bin)/nx run process-extension:package --skip-nx-cache

npm install extensible-angular-app-sdk-0.0.1.tgz
npm install extensible-angular-app-custom-template-0.0.1.tgz
npm install extensible-angular-app-content-0.0.1.tgz
npm install extensible-angular-app-process-0.0.1.tgz

# Change package.json and package-lock.json
# Remove aliases from tsconfig.base.json

