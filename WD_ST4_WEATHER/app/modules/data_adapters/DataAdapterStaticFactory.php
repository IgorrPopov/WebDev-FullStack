<?php

namespace App\Modules\DataAdapters;

final class DataAdapterStaticFactory
{
    public static function factory(string $type): iDataAdapter
    {

        if ($type === 'json') {

            return new JsonDataAdapter();

        } elseif ($type === 'api') {

            return new ApiDataAdapter();

        } elseif ($type === 'database') {

            return new DatabaseDataAdapter();

        }

        throw new \InvalidArgumentException('Unknown data source given');

    }
}
