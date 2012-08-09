<?php

/**
 * This file is part of the OpenPNE package.
 * (c) OpenPNE Project (http://www.openpne.jp/)
 *
 * For the full copyright and license information, please view the LICENSE
 * file and the NOTICE file that were distributed with this source code.
 */

/**
 * opSslUtil handled Ssl miscs
 *
 * @package    OpenPNE
 * @subpackage util
 * @author     Yuya Watanabe <watanabe@openpne.jpt>
 */

class opSslUtil
{
  public static function isRequiredAction($appName, $moduleName, $actionName)
  {
    $sslRequiredList = sfConfig::get('op_ssl_required_actions', array($appName => array()));

    return in_array($moduleName.'/'.$actionName, $sslRequiredList[$appName]);
  }

  public static function isSelectableAction($appName, $moduleName, $actionName)
  {
    $sslSelectableList = sfConfig::get('op_ssl_selectable_actions', array($appName => array()));

    return in_array($moduleName.'/'.$actionName, $sslSelectableList[$appName]);
  }
}
