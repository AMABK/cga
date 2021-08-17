export class Constants {

    public static UserTypes = {
        member : {name:'member',singular:'MEMBER',plural:'MEMBERS'},
        agripreneur : {name:'agripreneur',singular:'AGRIPRENEUR',plural:'AGRIPRENEURS'},
        agricoordinator : {name:'agricoordinator',singular:'AGRI-BUSINESS CORDINATOR',plural:'AGRI-BUSINESS CORDINATORS'},
        manager : {name:'manager',singular:'PROGRAMME MANAGER',plural:'PROGRAMME MANAGERS'},
        board : {name:'board',singular:'BOARD MEMBER',plural:'BOARD MEMBERS'},
        admin : {name:'admin',singular:'SYSTEM ADMIN',plural:'SYSTEM ADMINS'},
        superadmin : {name:'superadmin',singular:'SUPER ADMIN',plural:'SUPER ADMIN'},
    }

    public static Messages = {
    	LOGIN_SUCCESS: 'You have successfully logged in.',
    	LOGIN_FAILURE: 'Attempt to login to system failed!',
    	LOGOUT_SUCCESS: 'You have been logged out of system',
    	LOGOUT_FAILURE: 'Attempt to logout of system failed!',
    	SIGNUP_SUCCESS: 'You have been registered successfully.',
    	SIGNUP_FAILURE: 'User registration has failed!',
    	ACCOUNT_LOCK: 'User account has been locked.',
    	FORM_ERROR_FOUND: 'Correct errors on form before submit.',
    	ERROR_DATE_RANGE: 'End date should be greater than start date',
    	SELECT_OPTION: 'Select an option to proceed',
    	PASSWORD_REQUIRED: 'Enter valid password to proceed.',
    	CREDENTIALS_REQUIRED: 'Enter valid credentials to proceed.',
    	PASSWORD_RESET_SUCCESS: 'Your password reset code has been sent to ',
    	PASSWORD_CHANGE_SUCCESS: 'Your password has been changed successfully.',
    	PASSWORD_RESET_FAILURE: 'Attempt to reset password failed!',
    	RECORDS_FOUND: 'Search operation found records.',
    	RECORD_LOADED: 'Record loaded successfully.',
    	RECORDS_NOT_FOUND: 'Search didnt find any records!',
    	DELETE_SUCCESS: 'Record has been archived successfully',
    	SUSPEND_FAILURE: 'Could not suspend the selected user(s)!',
    	SUSPEND_SUCCESS: 'User has been suspended successfully',
    	DELETE_FAILURE: 'Could not archive the selected row(s)!',
    	SAVE_SUCCESS: 'Record has been saved successfully',
    	SAVE_FAILURE: 'Could not save the new record!',
    	UPDATE_SUCCESS: 'Record has been updated successfully',
    	UPDATE_FAILURE: 'Could not update the record changes!',
    	CONFIRM_DELETE: 'Do you really want to archive the selected record?',
    	CONFIRM_SUSPEND: 'Do you really want to suspend the selected user?',
      	SEND_SUCCESS: 'Notification has been sent successfully',
      	SEND_FAILURE: 'Notification could not be sent. Please retry',
      	COMPLETE_REGISTRATION: 'Kindly complete your registration in order to access other modules.',
      ACCESS_DENIED: 'Sorry you have no permission to this resource'
    }

    public static Title = {
    	REGISTRATION_PENDING: 'Pending Registration',
    	LOGOUT: 'User Logout',
    	LOGIN: 'User Login',
    	SIGNUP: 'Account Signup',
    	PASSWORD_RESET: 'Password Reset',
    	LOCK: 'Account Lock',
    	FORM_VALIDATION: 'Errors Found',
    	RECORD_OPERATION: 'Record Operation',
    	NOTIFICATION_SEND: 'Notification Send',
      PERMISSION: 'Permissions'
    }

    public static GenderList = [
      { name: 'Male', value: 'Male', checked: false },
      { name: 'Female', value: 'Female', checked: false },
      { name: 'Others', value: 'Others', checked: false }
	];

    public static MemberTypes = {
      individual: { name: 'INDIVIDUAL', value: 'individual', checked: false },
      group: { name: 'GROUP', value: 'group', checked: false },
      associate: { name: 'ASSOCIATE', value: 'associate', checked: false }
    };

    public static IndicatorTypes = [
      { name: 'Qualitative',value:'QL'},
      { name: 'Quantitative',value:'QN'},
    ];


    public static ActivityResultType = [
      { name: 'Activity',value:'A'},
      { name: 'Result',value:'R'},
    ];

    public static NotificationType = [
      { name: 'SMS',value:'sms'},
      { name: 'Email',value:'email'},
    ];

    public userTypes: any;
    public messages: any;
    public title: any;
    public genderList: any;
    public memberTypes: any;
    public indicatorTypes: any;
    public activityResultType: any;
    public notificationType: any;

    constructor(){
    	this.userTypes = Constants.UserTypes;
    	this.messages = Constants.Messages;
    	this.title = Constants.Title;
    	this.genderList = Constants.GenderList;
    	this.memberTypes = Constants.MemberTypes;
    	this.indicatorTypes = Constants.IndicatorTypes;
    	this.activityResultType = Constants.ActivityResultType;
    	this.notificationType = Constants.NotificationType;
    }
}
