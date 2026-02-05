import { useEffect } from "react"
import { GqlStatements } from "../enums"

export const useCreateMutation = (
    gqlStatement: string,
    variables: any,
    mutation: any,
    gqlStatementName: string) => {

    useEffect(() => {
        if(variables) {
            if(Object.keys(variables).some((key: string): boolean => variables[key] !== "")) {

                if(gqlStatement) {
                    if(gqlStatementName === GqlStatements.CREATE_PROJECT && variables.title) {
                        mutation.mutate()

                    } else if (gqlStatementName === GqlStatements.CREATE_SCENE) {
                        mutation.mutate()
                    }
                }
            }
        }
    }, [gqlStatement, variables?.title, variables])
    return
}