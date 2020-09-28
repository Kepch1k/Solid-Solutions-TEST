<?php
namespace Application\Core;

use \PDO;

class MyPdo
{
    private static $instance = null;
    private static $prepared_queries = [];
    private static $last_insert_id = null;

    private function __construct()
    {
        $this->instance = new PDO(
            DB_DSN,
            DB_LOGIN,
            DB_PASSWORD,
            [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"]
        );
        $this->instance->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
    }

    private function __clone()
    {
    }

    private function __wakeup()
    {
        throw new \Exception('Cannot unserialize a singleton.');
    }

    private static function initializeInstance()
    {
        self::getInstance();
    }

    private static function dbPrepareQuery($query, $key)
    {
        $pdo = self::$instance;
        self::$prepared_queries[$key] = $pdo->prepare($query);
    }

    private static function dbExecuteQuery($key)
    {
        $pdo = self::$instance;
        $pdo->beginTransaction();
        self::$prepared_queries[$key]->execute();
        self::$last_insert_id = $pdo->lastInsertId();
        $pdo->commit();
    }

    public static function dbSelectArray($query, $key = 'temp')
    {
        self::dbQuery($query, $key);
        if (array_key_exists($key, self::$prepared_queries)) {
            $query_result = self::$prepared_queries[$key];
            $result = [];
            while ($row = $query_result->fetch()) {
                $result[] = $row;
            }

            return $result;
        }

        return 'Error in request';
    }

    public static function dbSelectRow($query, $key = 'temp')
    {
        self::dbQuery($query, $key);
        if (array_key_exists($key, self::$prepared_queries)) {
            $query_result = self::$prepared_queries[$key];
            $result = [];
            while ($row = $query_result->fetch()) {
                $result = $row;
            }

            return $result;
        }

        return 'Error in request';
    }

    public static function dbQuery($query, $key = 'temp')
    {
        self::initializeInstance();
        self::dbPrepareQuery($query, $key);
        self::dbExecuteQuery($key);
    }

    public static function getLastInsertId()
    {
        return self::$last_insert_id;
    }

    public static function getInstance()
    {
        if (self::$instance != null) {
            return self::$instance;
        }
        self::$instance = (new self)->instance;
    }
}
