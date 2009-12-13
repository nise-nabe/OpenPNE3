<?php

/**
 * This file is part of the OpenPNE package.
 * (c) OpenPNE Project (http://www.openpne.jp/)
 *
 * For the full copyright and license information, please view the LICENSE
 * file and the NOTICE file that were distributed with this source code.
 */

/**
 * The opUpgrader handles upgrading to current OpenPNE3 from other.
 *
 * @package    OpenPNE
 * @subpackage upgrade
 * @author     Kousuke Ebihara <ebihara@tejimaya.com>
 */
class opUpgrader extends sfBaseTask
{
  protected
    $basePath = '',
    $options = array();

  public function __construct(sfEventDispatcher $dispatcher, sfFormatter $formatter, $basePath, $configuration)
  {
    parent::__construct($dispatcher, $formatter);

    if (!is_dir($basePath) || !is_readable($basePath))
    {
      throw new RuntimeException('The specified basepath for the opUpgrader must be directory and readable.');
    }

    $this->basePath = $basePath;
    $this->configuration = $configuration;
  }

  public function getDefinition()
  {
    $path = $this->basePath.DIRECTORY_SEPARATOR.'definition.yml';
    if (!is_file($path) || !is_readable($path))
    {
      throw new RuntimeException('The upgrade base path doesn\'t have a definition file for upgrading.');
    }

    return sfSimpleYamlConfigHandler::replaceConstants(sfSimpleYamlConfigHandler::getConfiguration(array($path)));
  }

  public function setOption($name, $value)
  {
    $this->options[$name] = $value;
  }

  public function getOption($name, $default = null)
  {
    if (!isset($this->options[$name]))
    {
      return $default;
    }

    return $this->options[$name];
  }

  protected function execute($arguments = array(), $options = array())
  {
    $definitions = $this->getDefinition();

    $timer = new sfTimer();
    $succeeded = array();

    $targets = $this->getOption('targets', array_keys($definitions));

    foreach ((array)$definitions as $k => $v)
    {
      if (!in_array($k, $targets))
      {
        continue;
      }

      $timer->startTimer();

      $defaultOptions = array_merge($this->options, array(
        'name'           => $k,
        'dir'            => $this->basePath,
        'required_rules' => array(),
        'configuration'  => $this->configuration,
        'dispatcher'     => new sfEventDispatcher(),
        'formatter'      => $this->formatter,
      ));

      $v = array_merge(array('options' => $defaultOptions), $v);
      if (!isset($v['options']['required_rules']))
      {
        $v['options']['required_rules'] = array();
      }

      $requiredRules = (array)$v['options']['required_rules'];
      if (!empty($requiredRules) && array_diff($requiredRules, $succeeded))
      {
        $this->logSection('upgrade', 'Passed '.$k, null, 'ERROR');
        continue;
      }

      $this->logSection('upgrade', 'Processing '.$k);

      if (isset($v['file']) && is_file($v['file']))
      {
        require_once $v['file'];
      }

      if (class_exists($v['strategy']))
      {
        $className = $v['strategy'];
      }
      else
      {
        $className = 'opUpgrade'.$v['strategy'].'Strategy';
      }

      sfOpenPNEApplicationConfiguration::registerZend();
      try
      {
        $strategy = new $className($v['options']);
        $strategy->run();

        $succeeded[] = $k;
      }
      catch (Exception $e)
      {
        $this->logBlock($e->getMessage(), 'ERROR');
      }
      sfOpenPNEApplicationConfiguration::unregisterZend();

      $this->logSection('upgrade', sprintf('Processed %s (%.2f sec)', $k, $timer->addTime()));
    }

    $this->logSection('upgrade', sprintf('Completed Upgrading (%.2f sec)', $timer->getElapsedTime()));
  }
}

