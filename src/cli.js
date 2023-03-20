import prompts from 'prompts';

/**
 * @type { {
 * type: string, 
 * name: string, 
 * message: string, 
 * choices?: { title: string, value: string, description?: string | undefined }[], 
 * initial?: string | number, 
 * active?: string, 
 * inactive?: string
 * }[] }
 */
const questions = [
    {
        type: 'text', 
        name: 'project', 
        message: 'Project name:', 
        initial: 'vanilla-project'
    }, 
    // TODO: add typescript prompt
    {
        type: 'select', 
        name: 'linter', 
        message: 'Add a code linter?', 
        choices: [
            { title: 'No', value: 'no' }, 
            { title: 'ESLint', value: 'eslint' }, 
            { title: 'Rome', value: 'rome' }
        ], 
        initial: 0
    }, 
    {
        type: prev => prev === 'eslint' ? 'toggle' : null, 
        name: 'prettier', 
        message: 'Use Prettier as a formatter?', 
        initial: false, 
        active: 'Yes', 
        inactive: 'No'
    }
];

export default {
    /** @returns { Promise<{ project: string, linter: string, prettier: boolean }> } */
    async run() {
        return await prompts(questions);
    }
};
