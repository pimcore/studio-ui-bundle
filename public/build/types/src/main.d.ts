import '@Pimcore/bootstrap';
import { type Pimcore } from './app/sdk';
declare global {
    interface Window {
        Pimcore: typeof Pimcore;
    }
}
//# sourceMappingURL=main.d.ts.map