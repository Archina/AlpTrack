import { z } from 'zod';
import { IDream } from '../store';

// Define schema for IMedication
export const medicationSchema = z.object({
  name: z.string(),
  time: z.string(),
});

// Define schema for IDream
export const dreamSchema = z.nativeEnum(IDream);

// Define schema for IEntry
export const entrySchema = z.object({
  dreams: z.array(dreamSchema),
  bedtime: z.string().nullable(),
  wakeup: z.string().nullable(),
  medications: z.array(medicationSchema),
  dayNote: z.string().nullable(),
  nightNote: z.string().nullable(),
});

// Define schema for IState
export const stateSchema = z.object({
  entries: z.record(entrySchema),
});