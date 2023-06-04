const expect = require('chai').expect;
require('dotenv').config();
const puppeteer = require ('puppeteer')
const locator = require ('.//locator');
let characters = 'testingagain'

class WebAppLogin {
  constructor(page) {
    this.page = page;
  }
 async generateEmail() {
  let result = '';
  let length = 5;
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  let showEmail = 'test' + result + '@test.com';
  return showEmail;
}
  async validLoginLogout(page) {
    await page.goto(locator.BASE_URL, { waitUntil: 'load', timeout: 0 });
    const pageTitle = await page.$eval('h3', element => element.textContent)
    expect(pageTitle).to.contains('Log in to your account')

    await page.type(locator.emailInput,process.env.REACT_APP_USERNAMEVALID)
    await page.type(locator.passwordInput,process.env.REACT_APP_PASSWORDVALID)
    const signInBtn = await page.$eval('button', element => element.textContent)
    expect(signInBtn).to.contains('Sign In')

    const elements = await page.$x(locator.loginButton)
    expect(elements).length.greaterThan(0)
    await elements[0].click()
    await page.waitForTimeout(3000)

    await page.click(locator.userProfile)
    const signOutBtn = await page.$eval('.flex:nth-child(4)', element => element.textContent)
    expect(signOutBtn).to.contains('Sign Out')

    const signOut = await page.$x(locator.signOut)
    expect(signOut).length.greaterThan(0)
    await signOut[0].click();
    await page.waitForTimeout(3000)
  }

  async signOut(page){
    await page.click(locator.userProfile)
    const signOut = await page.$x(locator.signOut)
    expect(signOut).length.greaterThan(0)
    await signOut[0].click();
    await page.waitForTimeout(3000)
  }
  async failedLogin(page){
    await page.goto(locator.BASE_URL, { waitUntil: 'load', timeout: 0 });
    const pageTitle = await page.$eval('h3', element => element.textContent)
    expect(pageTitle).to.contains('Log in to your account')

    await page.type(locator.emailInput,process.env.REACT_APP_USERNAMEVALID)
    await page.type(locator.passwordInput,process.env.REACT_APP_PASSWORDINVALID1)

    const signInBtn = await page.$eval('button', element => element.textContent)
    expect(signInBtn).to.contains('Sign In')

    const elements = await page.$x(locator.loginButton)
    expect(elements).length.greaterThan(0)
    await elements[0].click()
    await page.waitForTimeout(3000)

    const radios1 = await page.$eval('p', element => element.textContent)
    expect(radios1).to.contains('Passwords must be at least 6 characters')

    await page.waitForTimeout(3000)
  }

  async signUp(page){
    const email = await this.generateEmail();
    await page.goto(locator.BASE_URL, { waitUntil: 'load', timeout: 0 });
    await page.waitForTimeout(3000)
    const signUpBtn = await page.$eval('li:nth-child(2) > a', element => element.textContent)
    expect(signUpBtn).to.contains('Sign up')
    const signUpWeb = await page.$x(locator.signUpWeb)
    await signUpWeb[0].click()
    await page.waitForTimeout(3000)
    await page.click(locator.emailInput)
    await page.keyboard.type(email);
    await page.type(locator.passwordInput,process.env.REACT_APP_PASSWORDVALID)
    await page.type(locator.confirmPassword,process.env.REACT_APP_PASSWORDVALID)
    await page.type(locator.firstName,'test')
    await page.type(locator.lastName,'test')
    await page.waitForTimeout(3000)

    // await page.$eval('.jss14',
    //   e => {e.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })})

    await page.waitForTimeout(3000)
    const elements = await page.$x(locator.signUpWeb)
    await elements[0].click()
    await page.waitForTimeout(3000)

    const welcomeScreenTxt = await page.$eval('h1.mt-5.text-heading-1', element => element.textContent)
    expect(welcomeScreenTxt).to.contains('Hello test test, Welcome to AvoMD')
    await page.waitForTimeout(3000)
  }

  async forgetPassword(page){
    await page.goto(locator.BASE_URL, { waitUntil: 'load', timeout: 0 });
    const pageTitle = await page.$eval('h3', element => element.textContent)
    expect(pageTitle).to.contains('Log in to your account')
    await page.waitForTimeout(3000)
    const forgetPassword = await page.$eval('.mt-6 > a', element => element.textContent)
    expect(forgetPassword).to.contains('Forgot Password?')
    await page.click('.mt-6 > a')
    await page.waitForTimeout(3000)

    const forgetPasswordLabel = await page.$eval('h2:nth-child(1)',element => element.textContent)
    expect(forgetPasswordLabel).to.contains('Forgot Password')

    const resetPass = await page.$eval(locator.resetPasswordBtn,element => element.textContent)
    expect(resetPass).to.contains('Reset Password')

    await page.type(locator.emailInput,'jaffar.zahid@gaper.io')
    await page.click(locator.resetPasswordBtn)

    await page.waitForTimeout(3000)
  }

  async validLogin(page) {
    await page.goto(locator.BASE_URL, { waitUntil: 'load', timeout: 0 });
    const pageTitle = await page.$eval('h3', element => element.textContent)
    expect(pageTitle).to.contains('Log in to your account')

    await page.type(locator.emailInput,process.env.REACT_APP_USERNAMEVALID)
    await page.type(locator.passwordInput,process.env.REACT_APP_PASSWORDVALID)
    const signInBtn = await page.$eval('button', element => element.textContent)
    expect(signInBtn).to.contains('Sign In')

    const elements = await page.$x(locator.loginButton)
    expect(elements).length.greaterThan(0)
    await elements[0].click()
    await page.waitForTimeout(3000)
  }

  async channelModules(page){
    await this.validLogin(page);
    const featureArticle = (await page.$x('//h2[contains(.,\'All Channels\')]'))[0];
    const channelDropdown = await page.evaluate(el => {
      return el.textContent;
    }, featureArticle);

    expect(channelDropdown).to.contains('All Channels')

    const moduleTitle = await page.$eval(locator.glucoseModuleTitle,element => element.textContent)
    expect(moduleTitle).to.contains('Glucose-lowering medications in type 2 diabetes in the outpatient setting')

    const moduleDescription = await page.$eval(locator.moduleDescription,element => element.textContent)
    expect(moduleDescription).to.contains('Guide to intensifying glucose-lowering medications in patients with type 2 diabetes. Based on Buse et. al., 2020, Diabetes Care, "2019 Update to: Management of Hyperglycemia in Type 2 Diabetes, 2018. A Consensus Report by the ADA and the EASD"')

    await this.signOut(page);
  }

  async addChannel(page){
    await this.validLogin(page);
    const featureArticle = (await page.$x('//h2[contains(.,\'All Channels\')]'))[0];
    const channelDropdown = await page.evaluate(el => {
      return el.textContent;
    }, featureArticle);

    await page.click(locator.addChannel);
    await page.waitForTimeout(3000)
    await page.type(locator.searchChannel,'Jaffar');
    await page.waitForTimeout(3000)
    const addPvtChannel = await page.$x(locator.addBtnPvtChannel)
    await addPvtChannel[0].click()
    await page.waitForTimeout(3000)
    const passChannel = await page.$x(locator.passwordChannel)
    await passChannel[0].click();
    await passChannel[0].type('123')
    await page.waitForTimeout(3000)
    await page.click(locator.confirmBtnChannel);
    await page.waitForTimeout(3000)
    await page.click(locator.closeWindowPasswordChannel);
    await this.signOut(page);
  }

}
module.exports= new WebAppLogin();
