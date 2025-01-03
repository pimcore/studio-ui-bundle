/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 *
 * HOW TO USE:
 * 1. Place all the SVG files in the folder `./js/src/core/assets/icons`
 * 2. Please remove any duplicates and add SVG file names that use a protected word to the `protectedNames` array,
 * the script will append 'Icon' to the variable name.
 * 3. Run the script using `npm run generate-icons`
 * 4. The script will generate/replace the index file at `./js/src/core/modules/icon-library/index.ts`
 * 5. The script will also update the SVG files to use `currentColor` as the stroke color.
 */

import fs from 'fs';
import path from 'path';

const SVG_FOLDER = path.resolve('./js/src/core/assets/icons');
const OUTPUT_FILE = path.resolve('./js/src/core/modules/icon-library/index.ts');
const protectedNames = new Set(['new', 'package', 'import', 'export']);

if (!fs.existsSync(SVG_FOLDER)) {
    console.error(`Error: Directory ${SVG_FOLDER} does not exist.`);
    process.exit(1);
}

const files: string[] = fs.readdirSync(SVG_FOLDER as string).filter(file => file.endsWith('.inline.svg'));

if (files.length === 0) {
    console.log(`No SVG files found in ${SVG_FOLDER}`);
    process.exit(0);
}

const generateVariableName = (fileName: string): string => {
    const baseName = fileName.replace('.inline.svg', '');
    let variableName = baseName
        .replace(/[-_\s]+(.)?/g, (_, letter) => letter ? letter.toUpperCase() : '')
        .replace(/^./, str => str.toLowerCase());

    if (protectedNames.has(variableName)) {
        variableName += 'Icon';
    }

    return variableName;
};

const generateIconEntry = (fileName: string): string => {
    const iconName = fileName.replace('.inline.svg', '');

    const variableName = generateVariableName(fileName)
    return `
    iconLibrary.register({
      name: '${iconName}',
      component: ${variableName}
    });`;
};

const modifySvgStroke = (filePath: string): void => {
    let svgContent: string = fs.readFileSync(filePath, 'utf-8');

    svgContent = svgContent.replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
    fs.writeFileSync(filePath, svgContent, 'utf-8');
};

const variableNameSet = new Set<string>();
files.forEach(file => {
    const variableName = generateVariableName(file);

    if (variableNameSet.has(variableName)) {
        console.error(`Error: Duplicate SVG file detected with variable name '${variableName}'. File: '${file}'`);
        process.exit(1);
    }

    variableNameSet.add(variableName);
});

let content = `
/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH
 *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 */

/* eslint-disable max-lines */

import { container } from '@Pimcore/app/depency-injection';
import { moduleSystem } from '@Pimcore/app/module-system/module-system';
import { serviceIds } from '@Pimcore/app/config/services/service-ids';
import { type IconLibrary } from './services/icon-library';
`;

files.forEach((file: string) => {
    const filePath: string = path.join(SVG_FOLDER as string, file);
    modifySvgStroke(filePath);

    const variableName: string = generateVariableName(file);
    content += `
import ${variableName} from '@Pimcore/assets/icons/${file}';`;
});

content += `

moduleSystem.registerModule({
  onInit: () => {
    const iconLibrary = container.get<IconLibrary>(serviceIds.iconLibrary);`;

files.forEach(file => {
    content += generateIconEntry(file);
});

content += `
  }
});
`;

try {
    fs.writeFileSync(OUTPUT_FILE, content.trim());
    console.log(`Index file generated successfully at: ${OUTPUT_FILE}`);
} catch (error) {
    console.error('Error generating the index file:', error);
}