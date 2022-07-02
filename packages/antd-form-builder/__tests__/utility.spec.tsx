import { expect } from '@jest/globals';
import { deepAssignSetting } from '../src/components/utility';
import { Setting } from '../src/components/types';

describe('deepAssignSetting', () => {
  it('01/only merge new settings', () => {
    const globalSetting: Setting = {
      schema: {
        username: ['Username', 'input', { placeholder: 'Please input your username' }],
        password: ['Password', 'password', { placeholder: 'Please input your password' }]
      }
    };

    const localSetting: Setting = {
      schema: {
        email: ['Email', 'input', { placeholder: 'Please input your email' }]
      }
    };

    const result = deepAssignSetting(globalSetting, localSetting);
    const expectResult: Setting = {
      schema: {
        username: ['Username', 'input', { placeholder: 'Please input your username' }],
        password: ['Password', 'password', { placeholder: 'Please input your password' }],
        email: ['Email', 'input', { placeholder: 'Please input your email' }]
      }
    };
    expect(result).toEqual(expectResult);
  });

  it('02/merge settings overriding with undefined/null', () => {
    const globalSetting: Setting = {
      schema: {
        username: ['Username', 'input', { placeholder: 'Please input your username' }],
        password: ['Password', 'password', { placeholder: 'Please input your password' }]
      }
    };

    const localSetting: Setting = {
      schema: {
        username: ['New user name', 'input']
      }
    };

    const result = deepAssignSetting(globalSetting, localSetting);
    const expectResult: Setting = {
      schema: {
        username: ['New user name', 'input', { placeholder: 'Please input your username' }],
        password: ['Password', 'password', { placeholder: 'Please input your password' }]
      }
    };
    expect(result).toEqual(expectResult);
  });

  it.only('03/merge settings 3rd args', () => {
    const globalSetting: Setting = {
      schema: {
        username: ['Username', 'input', { placeholder: 'Please input your username' }],
        password: ['Password', 'password', { placeholder: 'Please input your password' }]
      }
    };

    const localSetting: Setting = {
      schema: {
        username: [null, null, { placeholder: 'New placeholder' }]
      }
    };

    const result = deepAssignSetting(globalSetting, localSetting);
    const expectResult: Setting = {
      schema: {
        username: ['Username', 'input', { placeholder: 'New placeholder' }],
        password: ['Password', 'password', { placeholder: 'Please input your password' }]
      }
    };
    expect(result).toEqual(expectResult);
  });
});
