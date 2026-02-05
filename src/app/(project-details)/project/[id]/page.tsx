'use client';

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Container, Divider, IconButton, Menu, MenuItem, MenuList, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, Tabs, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import  { CharacterCard } from '@/components/CharacterCard'
import { StepTabs } from '@/components/StepTabs';
import { CustomTabPanel } from '@/shared/CustomTabPanel';
import { sceneStore } from '@/state/sceneState';
import { useDebounce } from 'hooks';
import { CREATE_SCENE, UPDATE_SCENE } from 'mutations/SceneMutations'
import { Scene, Mutation, Version} from "@/interfaces/scene"
import { useCreateMutation } from 'hooks';
import { createMutation } from '@/helpers/createMutation';
import { GqlStatements } from '@/enums/GqlStatements';
import { useParams } from 'next/navigation'
import { ProjectHeader } from '@/components/ProjectHeader';
import { ScratchPadCard } from '@/components/ScratchPadCard';
import type { ScratchPadCardData, ScratchPadCardType, MoveToDestination } from '@/components/ScratchPadCard/types';


const DUMMY_SCRATCH_PAD_CARDS: ScratchPadCardData[] = [
  { id: '1', type: 'note', text: 'A retired detective must find a missing android who holds the key to his own past.' },
  { id: '2', type: 'note', text: 'A lone pilot discovers a signal from a colony thought lost decades ago.' },
  { id: '3', type: 'link', url: 'https://example.com/reference-material', label: 'Reference: world-building doc' },
  { id: '4', type: 'link', url: 'https://example.com/visual-mood', label: 'Visual mood board' },
  { id: '5', type: 'image', src: '/logo_symbol.png', caption: 'Mood: neon city' },
  { id: '6', type: 'image', src: '/logo_4.png', caption: 'Character concept' },
  { id: '7', type: 'video', src: '/logo_symbol.png', caption: 'Pitch reel placeholder' },
];

function createNewScratchPadCard(type: ScratchPadCardType): ScratchPadCardData {
  const id = `new-${Date.now()}`;
  switch (type) {
    case 'note':
      return { id, type: 'note', text: 'New note…' };
    case 'link':
      return { id, type: 'link', url: '', label: 'New link' };
    case 'image':
      return { id, type: 'image', caption: 'New image' };
    case 'video':
      return { id, type: 'video', caption: 'New video' };
    default:
      return { id, type: 'note', text: 'New note…' };
  }
}

export default function Project() {
    const setEditMode = sceneStore((state) => state.setEditMode)
    const activeStep = sceneStore((state) => state.activeStep)
    const setActiveStep = sceneStore((state) => state.setActiveStep)
    const setActiveScene = sceneStore((state) => state.setActiveScene)
    const activeVersion = sceneStore(state => state.activeVersion)
    const setActiveVersion = sceneStore((state) => state.setActiveVersion)
    const setNewVersion = sceneStore((state) => state.setNewVersion)
    const setHandleSave = sceneStore((state) => state.setHandleSave)
    const createStatement = sceneStore((state) => state.createStatement)
    const setCreateStatement = sceneStore((state) => state.setCreateStatement)

    const versionOptions = sceneStore((state) => state.versionOptions)
    const setVersionOptions = sceneStore((state) => state.setVersionOptions)

    const [sceneContent, setSceneContent] = useState()
    //const setSceneContent = sceneStore((state) => state.setSceneContent)

    const [ createVariables, setCreateVariables ] = useState<any>()
    const [expandedTop, setExpandedTop] = useState(true)
    const [expandedBottom, setExpandedBottom] = useState(true)
    const [characters, setCharacters] = useState([])
    const [scenes, setScenes] = useState<Array<Scene>>([])
    const [value, setValue] = useState(0);
    const [bottomValue, setBottomValue] = useState(0);
    const [title, setTitle] = useState("")
    const [act, setAct] = useState<number>(0)
    const [scratchPadCards, setScratchPadCards] = useState<ScratchPadCardData[]>(DUMMY_SCRATCH_PAD_CARDS)
    const [addCardAnchor, setAddCardAnchor] = useState<null | HTMLElement>(null)
    const params = useParams()


    const id = params.id

    const updateMutationArgs: Mutation = {
        createStatement: UPDATE_SCENE,
        createVariables: createVariables, 
        invalidateQueriesArray: ['projects'],
        stateResetters: {
            setCreateStatement,
            setCreateVariables,
            setVersionOptions,
            setNewVersion
        }
    }


    const createMutationArgs: Mutation = {
        createStatement: CREATE_SCENE,
        createVariables: createVariables, 
        invalidateQueriesArray: ['projects'],
        stateResetters: {
            setCreateStatement,
            setCreateVariables
        }
    }


    const createSceneMutation = createMutation(createMutationArgs)
    useCreateMutation(createStatement, createVariables, createSceneMutation, GqlStatements.CREATE_SCENE)

    const updateSceneMutation = createMutation(updateMutationArgs)
    useCreateMutation(createStatement, sceneContent, updateSceneMutation, GqlStatements.UPDATE_SCENE)

    const handleSave = useDebounce((
            newVersion: boolean,
            newScene: boolean,
            projectId: string,
            number: number,
            newVersionDisplay: number,
            step: string,
            updateKey: string,
            value: string) => {

        if(newScene) {
           
            setCreateStatement(CREATE_SCENE)
            setCreateVariables({
                act,
                projectId,
                newVersion,
                number,
                activeVersion,
                newScene,
                versions: [{
                act,
                [updateKey]: value,
                step,
            }]})
        } /*else {
            //set newVersion correctly
            setCreateStatement(UPDATE_SCENE)
            
            setCreateVariables({act, projectId, number, versions: [{
                ...sceneContent,
                newVersion,
                version: newVersion ? newVersionDisplay + 1  : sceneContent.version,
                thesis: sceneContent.thesis
            }]})
        }*/
    })

    useEffect(() => {
        setHandleSave(handleSave)
    }, [handleSave])

    const handleBottomChange = (event: React.SyntheticEvent, newValue: number) => {
        event.stopPropagation()
        setBottomValue(newValue);
    };

    const handleActChange = (event: React.SyntheticEvent, newValue: number) => {
        event.stopPropagation()
        setAct(newValue);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.stopPropagation()
        setValue(newValue);
    };

    const toggleAccordionTop = () => {
        setExpandedTop(!expandedTop)
    }

    const toggleAccordionBottom = () => {
        setExpandedBottom(!expandedBottom)
    }

    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const actTabProps = (index: number) => {
        return {
            id: `simple-tab=${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        }
    }

    const handleAddScene = (act: number) => {
        setActiveScene(scenes.length + 1)
        //setNewVersion(true)

        const newVersion: Scene = {
            act,
            newScene: true,
            number: scenes.length + 1,
            activeVersion: 1,
            projectId: id as string,
            versions: [{
                act,
                antithesis: "",
                synopsis: "",
                synthesis: "",
                thesis: "",
                version: 1,
                sceneHeading: "",
                step: activeStep
            }]
        }

        setScenes([...scenes, newVersion])
    }

    const handleAddCharacter = () => {

    }

    const handleAddScratchPadCard = (type: ScratchPadCardType) => {
        setScratchPadCards((prev) => [...prev, createNewScratchPadCard(type)])
        setAddCardAnchor(null)
    }

    const handleMoveScratchPadTo = (destination: MoveToDestination) => {
        // TODO: wire to actual move (e.g. copy to section, then optionally remove from scratch pad)
    } 

    const outline = {
        name: "Hero's Journey",
        acts: [ 
            {
                
                label: "Act 1",
                steps: [
                    {
                        stepName: "Ordinary World",
                        stepDetails: "The start",
                        stepAct: 1
                    },
                    {
                        stepName: "Call To Adventure",
                        stepDetails: "The start",
                        stepAct: 1
                    },
                    {
                        stepName: "Refusal",
                        stepDetails: "The start",
                        stepAct: 1
                    },
                    {
                        stepName: "Meeting the Mentor",
                        stepDetails: "The start",
                        stepAct: 1
                    },
                    {
                        stepName: "Threshold",
                        stepDetails: "The start",
                        stepAct: 1
                    }
                ]
                
            },
            {
                label: "Act 2",
                steps: [

                ]
            }

            
        ],
        
    }

    return (
        <Container maxWidth={false} disableGutters sx={{ display: "flex",  flexDirection: "column", flex: 1, padding: 2, height: "100%", width: "100%"}}>

            <ProjectHeader />

            <Container maxWidth={false} disableGutters sx={{ flex: 1, width: "100%", paddingTop: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>Scratch Pad Ideas</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={(e) => setAddCardAnchor(e.currentTarget)}
                        aria-controls={addCardAnchor ? 'add-scratch-card-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={addCardAnchor ? 'true' : undefined}
                    >
                        Add card
                    </Button>
                </Box>
                <Menu
                    id="add-scratch-card-menu"
                    anchorEl={addCardAnchor}
                    open={Boolean(addCardAnchor)}
                    onClose={() => setAddCardAnchor(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={() => handleAddScratchPadCard('note')}>Note</MenuItem>
                    <MenuItem onClick={() => handleAddScratchPadCard('link')}>Link</MenuItem>
                    <MenuItem onClick={() => handleAddScratchPadCard('image')}>Image</MenuItem>
                    <MenuItem onClick={() => handleAddScratchPadCard('video')}>Video</MenuItem>
                </Menu>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
                    {scratchPadCards.map((card) => (
                        <ScratchPadCard
                            key={card.id}
                            data={card}
                            onMoveTo={handleMoveScratchPadTo}
                        />
                    ))}
                </Box>
            </Container>
            
        </Container>
       
    )
}