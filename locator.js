
class locators{
  constructor(page) {
    this.page = page;
    this.BASE_URL='https://live.avomd.io/signin';
    this.emailInput = '[data-testid=\"email\"]';
    this.passwordInput = '[data-testid="password"]';
    this.loginButton = "//button[@type=\"submit\"]";
    this.userProfile = 'svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge';
    this.signOut = '//*[contains(text(),\'Sign Out\')]';
    this.signUp = '//a[contains(.,\'Sign up\')]';
    this.confirmPassword = '[data-testid="confirmPassword"]';
    this.firstName = '[data-testid="firstName"]';
    this.lastName = '[data-testid="lastName"]';
    this.signUpWeb = '//a[contains(.,\'Sign up\')]';
    this.resetPasswordBtn = '[data-testid="resetPasswordBtn"]';
    this.glucoseModuleTitle = '[data-testid="module-card-title"]';
    this.moduleDescription = '[data-testid="module-card-description"]';
    this.addChannel = 'a.button.colored-primary';
    this.searchChannel = 'input.MuiInputBase-input.MuiInput-input';
    this.addBtnPvtChannel = '(//button[@type=\'button\'])[7]';
    this.passwordChannel = '//input[@class=\'jss32\']';
    this.confirmBtnChannel = '.jss55 > .MuiButton-label';
    this.closeWindowPasswordChannel = 'svg.MuiSvgIcon-root.jss46';
    this.forgotPasswordCTA = "//p[contains(text(),'Forgot Password?')]";
  }
}
module.exports = new locators()
