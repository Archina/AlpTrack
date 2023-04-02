import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { init } from 'svelte/internal';

interface IState{
    entries: {
        [year_month_day: string]: IEntry
    }
}

export type DayIdentifier = [number, number, number];

export function extractDate(entries: IState['entries'], [year, month, day]: DayIdentifier): IEntry | null
{
    let result = entries[`${year}_${month}_${day}`];
    return result ?? null;
}

export function upsert_entry(entries: IState['entries'], [year, month, day]: DayIdentifier, entry: IEntry): IState['entries']{
    return {
        ...entries,
        [`${year}_${month}_${day}`]: entry
    }
}

export function update_entry(entries: IState['entries'], [year, month, day]: DayIdentifier, entry: Partial<IEntry> | ((e: IEntry) => Partial<IEntry>)): IState['entries']{
    return {
        ...entries,
        [`${year}_${month}_${day}`]: typeof entry === 'function' ?
            {...entries[`${year}_${month}_${day}`], ...entry(entries[`${year}_${month}_${day}`])} :
            {...entries[`${year}_${month}_${day}`], ...entry}
    }
}

export interface IEntry{
    dreams: IDream[],
    bedtime: string | null,
    wakeup: string | null,
    medications: IMedication[],
    dayNote: string | null,
    nightNote: string | null,
}

export interface IMedication{
    name: string,
    time: string,
}

export function newEntry(): IEntry {
    return {
        dreams: [],
        bedtime: null,
        wakeup: null,
        medications: [],
        dayNote: null,
        nightNote: null,
    }
}

// year -> month -> day Storage

export const initialState: IState = {
    entries: {}
}

export enum IDream{
    Normal = 1,
    SemiDistressing = 2,
    Distressing = 3,
}

const tmpState: IState = browser ?
    JSON.parse(localStorage.getItem('state') || JSON.stringify(initialState)) :
    initialState;
// Patch all entries
tmpState.entries = Object.entries(tmpState.entries).reduce((hash, [key, value]) => ({...hash, [key]: {...newEntry(), ...value}}), tmpState.entries);

export const store = writable(tmpState);

if(browser){
    store.subscribe(update => {
        localStorage.setItem('state', JSON.stringify(update))
    })
}