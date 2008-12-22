<?php
$criteria = new Criteria();
$criteria->add(IntroEssayPeer::TO_ID, $id);
$criteria->addDescendingOrderByColumn(IntroEssayPeer::ID);
$introEssays = IntroEssayPeer::doSelect($criteria);

if (count($introEssays)) {
  $html = "";
  $list = array();
  foreach ($introEssays as $introEssay) {
      $criteria = new Criteria();
      $criteria->add(MemberPeer::ID, $introEssay->getFromId());
      $writer = MemberPeer::doSelectOne($criteria);

      $list[link_to('<img src="' . $writer->getImage() . '" alt="' . $writer->getName() . '" /><br />' . $writer->getName(), 'member/' . $writer->getId())] = nl2br($introEssay->getContent());
  }
  include_list_box('introEssay', $list, array( 'title' => 'からの紹介文'));
}
