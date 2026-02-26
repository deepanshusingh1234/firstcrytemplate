import cpidData from '../data/cpid.json';
import { CPIDData, Section } from '../types/cpid';

export const getCPIDData = (): CPIDData => {
    return cpidData as CPIDData;
};

export const getCPIDSections = (): Section[] => {
    return getCPIDData().sections;
};

export const getCPIDId = (): string => {
    return getCPIDData().cpidId;
};