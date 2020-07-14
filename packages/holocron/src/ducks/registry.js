/*
 * Copyright 2020 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,either express
 * or implied. See the License for the specific language governing permissions and limitations
 * under the License.
 */

import { fromJS, Map as iMap, List as iList } from 'immutable';

import {
  REGISTRY_MODULES_KEY,
  REGISTRY_MODULE_MAP_KEY,
  REGISTRY_MODULE_BLOCKED_KEY,
  REGISTER_MODULE,
  BLOCK_MODULE,
  SET_MODULE_MAP,
  RESET_MODULES_AND_MAP,
} from './constants';

const initialState = iMap({
  [REGISTRY_MODULES_KEY]: iMap({}),
  [REGISTRY_MODULE_MAP_KEY]: iMap({ modules: iMap({}) }),
  [REGISTRY_MODULE_BLOCKED_KEY]: iList([]),
});

export function createInitialState(moduleMap, modules, blocked) {
  return fromJS({
    [REGISTRY_MODULES_KEY]: fromJS(modules || {}),
    [REGISTRY_MODULE_MAP_KEY]: fromJS(moduleMap || {}),
    [REGISTRY_MODULE_BLOCKED_KEY]: iList(blocked),
  });
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RESET_MODULES_AND_MAP: {
      const { newModuleMap, newModules } = action;
      return state
        .update(REGISTRY_MODULES_KEY, iMap(),
          (modules) => modules.clear().merge(fromJS(newModules || {})))
        .update(REGISTRY_MODULE_MAP_KEY, iMap(),
          (moduleMap) => moduleMap.clear().merge(fromJS(newModuleMap || {})));
    }
    case BLOCK_MODULE: {
      const { moduleUrl } = action;
      return state
        .update(REGISTRY_MODULE_BLOCKED_KEY, iList(),
          (blockList) => blockList.push(moduleUrl));
    }
    case SET_MODULE_MAP: {
      const { newModuleMap } = action;
      return state
        .update(REGISTRY_MODULE_MAP_KEY, iMap(),
          (moduleMap) => moduleMap.clear().merge(fromJS(newModuleMap)));
    }
    case REGISTER_MODULE: {
      const { moduleName, module } = action;
      return state
        .update(REGISTRY_MODULES_KEY, iMap(),
          (modules) => modules.set(moduleName, module));
    }
    default:
      return state;
  }
}

export function registerModule(moduleName, module) {
  return {
    type: REGISTER_MODULE,
    moduleName,
    module,
  };
}

export function blockModule(moduleUrl) {
  return {
    type: BLOCK_MODULE,
    moduleUrl,
  };
}

export function setModuleMap(newModuleMap) {
  return {
    type: SET_MODULE_MAP,
    newModuleMap,
  };
}

export function resetModuleRegistry(newModules, newModuleMap) {
  return {
    type: RESET_MODULES_AND_MAP,
    newModules,
    newModuleMap,
  };
}

export function isModuleBlocked(moduleUrl) {
  return (state) => state.hasIn([REGISTRY_MODULE_BLOCKED_KEY, moduleUrl]);
}

export function getModule(moduleName) {
  return (state) => state.getIn([REGISTRY_MODULES_KEY, moduleName]);
}

export function getModules() {
  return (state) => state.getIn([REGISTRY_MODULES_KEY]);
}

export function getModuleMap() {
  return (state) => state.getIn([REGISTRY_MODULE_MAP_KEY]);
}

export function getBlockedModules() {
  return (state) => state.getIn([REGISTRY_MODULE_BLOCKED_KEY]);
}
