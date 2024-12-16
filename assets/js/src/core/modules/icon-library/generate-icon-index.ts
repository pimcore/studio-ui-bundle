
import * as fs from 'fs';
import * as path from 'path';

const SVG_FOLDER = path.resolve('./js/src/core/assets/icons');
const OUTPUT_FILE = path.resolve('./js/src/core/modules/icon-library/icon-index.ts');

const generateIconEntry = (fileName: string): string => {
    const baseName = fileName.replace('.inline.svg', '');
    const variableName = baseName
        .replace(/[-_\s](.)/g, (_, letter) => letter.toUpperCase())
        .replace(/^./, str => str.toLowerCase());
    return `
import ${variableName} from '@Pimcore/assets/icons/${fileName}';

iconLibrary.register({
  name: '${baseName}',
  component: ${variableName}
});
`;
};

const generateIndexFile = async () => {
    try {
        const files = fs.readdirSync(SVG_FOLDER);
        const svgFiles = files.filter(file => file.endsWith('.inline.svg'));

        if (svgFiles.length === 0) {
            console.log('No SVG files found in the specified folder.');
            return;
        }

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

moduleSystem.registerModule({
  onInit: () => {`;

        for (const svgFile of svgFiles) {
            content += generateIconEntry(svgFile);
        }

        content += `
  }
});
`;

        fs.writeFileSync(OUTPUT_FILE, content.trim());
        console.log(`Index file generated successfully at: ${OUTPUT_FILE}`);
    } catch (error) {
        console.error('Error generating the index file:', error);
    }
};

(async () => {
    try {
        await generateIndexFile();
        console.log('Icon index file generation completed successfully.');
    } catch (error) {
        console.error('Error occurred during icon index generation:', error);
    }
})();
