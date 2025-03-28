<?php

namespace Pimcore\Bundle\StudioUiBundle;

use Pimcore\Extension\Bundle\Installer\SettingsStoreAwareInstaller;

class Installer extends SettingsStoreAwareInstaller
{

    public function install(): void
    {
        //currently nothing to do
        $this->markInstalled();
    }

    public function uninstall(): void
    {
        //currently nothing to do
        $this->markUninstalled();
    }

}