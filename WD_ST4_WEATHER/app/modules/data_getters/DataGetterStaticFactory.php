<?php

namespace App\Modules\DataGetters;


final class DataGetterStaticFactory
{

    public static function factory(string $type): iDataGetter
    {
        if ($type === 'json') {

            return new JsonDataGetter();

        } elseif ($type === 'api') {

            return new ApiDataGetter();

        } elseif ($type === 'database') {

            return new DatabaseDataGetter();

        }

        throw new \InvalidArgumentException('Unknown data source given');
    }

}
