import navigationData from '../data/navigation.json';
import { NavigationData } from '../types/navigation';

export const getNavigationData = (): NavigationData => {
    return navigationData as NavigationData;
};

export const getMainCategories = () => {
    return getNavigationData().mainCategories;
};

export const getTopMenuItems = () => {
    const data = getNavigationData();
    return {
        leftSection: data.topMenu.leftSection,
        rightSection: data.topMenu.rightSection
    };
};

export const getCategoryById = (id: string) => {
    return getNavigationData().mainCategories.find(cat => cat.id === id);
};

export const getMyAccountItems = () => {
    return getNavigationData().myAccount.sections[0].items;
};