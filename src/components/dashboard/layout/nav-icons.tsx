import type { Icon } from '@phosphor-icons/react';  // Direct import from the main package
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react';
import { Swap as SwapIcon } from '@phosphor-icons/react';  // Simplified import
import { GearSix as GearSixIcon } from '@phosphor-icons/react';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react';
import { User as UserIcon } from '@phosphor-icons/react';
import { Users as UsersIcon } from '@phosphor-icons/react';
import { XSquare } from '@phosphor-icons/react';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  'swap': SwapIcon,
  'user': UserIcon,
  'users': UsersIcon,
} as Record<string, Icon>;
