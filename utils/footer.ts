import footerData from '../data/footer.json';
import { FooterData } from '../types/footer';

export const getFooterData = (): FooterData => {
    return footerData as FooterData;
};

export const getCategoriesSection = () => {
    return getFooterData().categories;
};

export const getCompanyInfoSection = () => {
    return getFooterData().companyInfo;
};

export const getFirstCryParentingSection = () => {
    return getFooterData().firstCryParenting;
};

export const getRegionalParentingSection = () => {
    return getFooterData().regionalParenting;
};

export const getOtherWebsitesSection = () => {
    return getFooterData().otherWebsites;
};

export const getShippingPoliciesSection = () => {
    return getFooterData().shippingPolicies;
};

export const getPaymentMethodsSection = () => {
    return getFooterData().paymentMethods;
};

export const getSocialMediaSection = () => {
    return getFooterData().socialMedia;
};

export const getOurAppsSection = () => {
    return getFooterData().ourApps;
};

export const getLearningEducationSection = () => {
    return getFooterData().learningEducation;
};

export const getShopInternationalSection = () => {
    return getFooterData().shopInternational;
};

export const getKidsLearningAppsSection = () => {
    return getFooterData().kidsLearningApps;
};

export const getCareersSection = () => {
    return getFooterData().careers;
};

export const getFranchiseData = () => {
    return getFooterData().franchise;
};

export const getSeoContent = () => {
    return getFooterData().seoContent;
};

export const getCopyrightText = () => {
    return getFooterData().copyright;
};