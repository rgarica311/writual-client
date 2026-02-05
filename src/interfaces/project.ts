import { ProjectType } from "../enums";
import { Scene } from "./scene";

export interface Project {
    id: string;
    created_date: string;
    modified_date: string;
    revision: number;
    user: string;
    sharedWith: string[];
    type: ProjectType;
    genre: string;
    title: string;
    logline: string;
    budget: number;
    timePeriod: string;
    similarProjects: string[];
    outlineName?: string;
    poster?: string;
    scenes: Scene[];
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface CreateProjectProps {
    setAddProject: Function
    handleAddProject: Function
}