export interface Version {
    version: number;
    act: number;
    step: string;
    synopsis: string;
    thesis: string;
    antithesis: string;
    synthesis: string;
    sceneHeading: string;
    locked: boolean;

}

export interface Scene  {
    number?: number;
    activeVersion?: number;
    newScene?: boolean;
    newVersion?: boolean;
    projectId: string;
    versions: Version[];
}

export interface Mutation {
    createStatement: string;
    createVariables: {[key: string]: string};
    invalidateQueriesArray: string[];
    stateResetters?: {[key: string]: Function};
}