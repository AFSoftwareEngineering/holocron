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

import React from 'react';
import { useDispatch } from 'react-redux';

import { getMergeProps } from '../utility';

export default function useModuleProps(Module, props, moduleState) {
  const dispatch = useDispatch();

  return React.useMemo(
    () => getMergeProps(Module, (mergeProps) => mergeProps(moduleState, {
      dispatch, load: props.load || Module.holocron.load,
    }, props), props),
    [dispatch, props, moduleState]
  );
}
