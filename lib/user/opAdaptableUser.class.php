<?php

/**
 * This file is part of the OpenPNE package.
 * (c) OpenPNE Project (http://www.openpne.jp/)
 *
 * For the full copyright and license information, please view the LICENSE
 * file and the NOTICE file that were distributed with this source code.
 */

/**
 * opAdaptableUser will handle auth adapters
 *
 * @package    OpenPNE
 * @subpackage user
 * @author     Kousuke Ebihara <ebihara@php.net>
 */
abstract class opAdaptableUser extends opBaseSecurityUser
{
  /**
   * Initializes the current user.
   *
   * @see sfBasicSecurityUser
   */
  public function initialize(sfEventDispatcher $dispatcher, sfStorage $storage, $options = array())
  {
    parent::initialize($dispatcher, $storage, $options);
    if ($this->getMemberId() && $this->isTimedOut())
    {
      $this->getAttributeHolder()->removeNamespace('opSecurityUser');
    }

    $request = sfContext::getInstance()->getRequest();
    $authMode = $request->getUrlParameter('authMode');
    if ($authMode)
    {
      $this->setCurrentAuthMode($authMode);
    }

    AuthAdapterRepository::createAuthAdapter($this->getCurrentAuthMode());
  }

  public function getAuthAdapter($authMode = null)
  {
    if (!$authMode)
    {
      $authMode = $this->getCurrentAuthMode();
    }

    return AuthAdapterRepository::createAuthAdapter($authMode);
  }

  public function getAuthForm()
  {
    return $this->getAuthAdapter()->getAuthForm();
  }

  public function setCurrentAuthMode($authMode)
  {
    $this->setAttribute('auth_mode', $authMode, 'opSecurityUser');
    AuthAdapterRepository::createAuthAdapter($this->getCurrentAuthMode());
  }

  public function getCurrentAuthMode($allowGuess = true)
  {
    $authMode = $this->getAttribute('auth_mode', null, 'opSecurityUser');

    $authModes = AuthAdapterRepository::getAuthModes();
    if (!in_array($authMode, $authModes))
    {
      if ($allowGuess)
      {
        $authMode = array_shift($authModes);
      }
      else
      {
        $authMode = null;
      }
    }

    return $authMode;
  }
}
