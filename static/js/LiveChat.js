var initESW = function(gslbBaseURL) {
    embedded_svc.settings.displayHelpButton = true; //Or false
    embedded_svc.settings.language = ''; //For example, enter 'en' or 'en-US'

    embedded_svc.settings.extraPrechatFormDetails = [{
        "label":"First Name",
        "transcriptFields": ["Pre_chat_First_Name__c"]
    }, {
        "label":"Last Name",
        "transcriptFields": ["Pre_chat_Last_Name__c"]
    }, {
        "label":"Email",
        "transcriptFields": ["Pre_chat_Email__c"]
    }, {
        "label":"Mobile",
        "transcriptFields": ["Pre_chat_Mobile__c"]
    }, {
        "label":"Subject",
        "transcriptFields": ["Pre_chat_Subject__c"]
    }, {
        "label":"Category (Qren)",
        "transcriptFields": ["Pre_chat_Category_Product__c"]
    }];

    //embedded_svc.settings.defaultMinimizedText = '...'; //(Defaults to Chat with an Expert)
    //embedded_svc.settings.disabledMinimizedText = '...'; //(Defaults to Agent Offline)

    //embedded_svc.settings.loadingText = ''; //(Defaults to Loading)
    //embedded_svc.settings.storageDomain = 'yourdomain.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)

    // Settings for Chat
    //embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
        // Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
        // Returns a valid button ID.
    //};
    //embedded_svc.settings.prepopulatedPrechatFields = {}; //Sets the auto-population of pre-chat form fields
    //embedded_svc.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
    //embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)

    embedded_svc.settings.enabledFeatures = ['LiveAgent'];
    embedded_svc.settings.entryFeature = 'LiveAgent';

    embedded_svc.init(
        'https://telkom.my.salesforce.com',
        'https://telkom-site.secure.force.com',
        gslbBaseURL,
        '00D5g000004DkS9',
        'Chat_DigitalPass',
        {
            baseLiveAgentContentURL: 'https://c.la2-c1-ukb.salesforceliveagent.com/content',
            deploymentId: '5725g000000Gr2l',
            buttonId: '5735g000000H0Ml',
            baseLiveAgentURL: 'https://d.la2-c1-ukb.salesforceliveagent.com/chat',
            eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I5g0000008XuSEAU_17930954c17',
            isOfflineSupportEnabled: false
        }
    );
};

if (!window.embedded_svc) {
    var s = document.createElement('script');
    s.setAttribute('src', 'https://telkom.my.salesforce.com/embeddedservice/5.0/esw.min.js');
    s.onload = function() {
        initESW(null);
    };
    document.body.appendChild(s);
} else {
    initESW('https://service.force.com');
}
