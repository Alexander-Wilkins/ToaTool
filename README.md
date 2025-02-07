![Alt text](frontend/src/assets/images/toa-tool-logo-white.png?raw=true "ToaTool")
# ToaToal v0.1.0
---
A Mobile-First tool for determining which Bionicle sets are able to be built based off of the user's existing quantity of pieces. Each of the Bionicle Sets can be searched by Year. 

### Tech Stack
- Frontend = Angular v19
- Backend = NestJS

### What does this app do? 
ToaTool is an Angular Frontend, NestJS API backend. NestJS consumes a 3rd-party API from Rebrickable, where JSON data is transformed, and filtered using a Rebrickable Controller. The Angular frontend, utilizes a Bionicle Provider to consume the data from the local API with images and meta data about LEGO pieces. 
The app also cross compares a small, local dataset of LEGO pieces that a fake user theoretically owns, and compares that dataset to each Bionicle LEGO set and dynamically shows which pieces are missing _compared_ to that specific set. This enables the user to determine which pieces they might consider to purchase to complete their Bionicle collection. 


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
