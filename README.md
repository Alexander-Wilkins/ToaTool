![Alt text](frontend/public/images/toa-tool-logo-white.png?raw=true "ToaTool")
# ToaToal v0.1.0
---
A Mobile-First tool for determining which Bionicle sets are able to be built based off of the user's existing quantity of pieces. Each of the Bionicle Sets can be searched by Year. 


## Instructions for Installation
### Clone the Repo
1. Create a new directory and enter the following command: 
```
git clone https://github.com/Alexander-Wilkins/ToaTool.git
```
### Installation
2. Install Packages at the root directory
```
npm install
```
3. Spin up NestJS API Server
```
cd backend                      // if not in the root directory
npm run build
npm run start:prod    
```
4. Go back to root directory Spin up Angular Frontend
```
cd ..                           // Navigate to Root directory
cd frontend  
npm install -g @angular/cli        
ng build
npm run serve:ssr:frontend
```
4. Terminal should say ```$   Node Express server listening on http://localhost:4000```

---