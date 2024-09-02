const express = require('express');
const path = require('path');
const cors = require('cors');
const Validator = require('./middlewares/Validator');
const authRoutes = require('./routes/auth');
const personalInfoRoutes = require('./routes/PersonalInfo');
const financialInfoRoutes = require('./routes/FinancialInfo');
const educationInfoRoutes = require('./routes/EducationInfo');
const workplaceInfoRoutes = require('./routes/WorkplaceInfo');
const familyInfoRoutes = require('./routes/FamilyInfo');
const personalInterestRoutes = require('./routes/PersonalInterest');
const profileRoutes = require('./routes/Profile');
const pictureRoutes = require('./routes/Picture');



const app = express();


app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/picture', pictureRoutes);
app.use('/auth', authRoutes);
app.use('/api/personal_info', personalInfoRoutes);
app.use('/api/education_info', educationInfoRoutes);
app.use('/api/workplace_info', workplaceInfoRoutes);
app.use('/api/family_info', familyInfoRoutes);
app.use('/api/personal_interest', personalInterestRoutes);
app.use('/api/financial_info', financialInfoRoutes);
app.use('/api/profile', profileRoutes);


app.listen(process.env.PORT || 3001, ()=> console.log("Listneing on port 3001"));