<?php

class AuthAdapterRepository
{
  protected
    $authAdapters = array();

  public static function getAuthAdapters()
  {
    $adapters = array();
    $plugins = sfContext::getInstance()->getConfiguration()->getEnabledAuthPlugin();

    foreach ($plugins as $pluginName)
    {
      $endPoint = strlen($pluginName) - strlen('opAuth') - strlen('Plugin');
      $authMode = substr($pluginName, strlen('opAuth'), $endPoint);
      $adapterClass = self::getAuthAdapterClassName($authMode);
      $adapters[$authMode] = new $adapterClass($authMode);
    }

    return $adapters;
  }

  public static function getAuthModes()
  {
    $is_mobile = sfConfig::get('app_is_mobile', false);
    $result = array();

    $adapters = self::getAuthAdapters();
    foreach ($adapters as $authMode => $adapter)
    {
      if (($is_mobile && !$adapter->getAuthConfig('enable_mobile'))
        || (!$is_mobile && !$adapter->getAuthConfig('enable_pc')))
      {
        continue;
      }

      $result[] = $authMode;
    }

    return $result;
  }

  public static function getAuthForms()
  {
    $result = array();

    $authModes = self::getAuthModes();
    foreach ($authModes as $authMode)
    {
      $adapterClass = self::getAuthAdapterClassName($authMode);
      $adapter = new $adapterClass($authMode);
      $result[$authMode] = $adapter->getAuthForm();
    }

    return $result;
  }

  public static function createAuthAdapter($authMode)
  {
    if (empty(self::$authAdapters[$authMode]))
    {
      $containerClass = self::getAuthAdapterClassName($authMode);
      self::$authAdapters[$authMode] = new $containerClass($authMode);
    }

    return self::$authAdapters[$authMode];
  }


  public static function getAuthAdapterClassName($authMode)
  {
    return 'opAuthAdapter'.ucfirst($authMode);
  }
}
