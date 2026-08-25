(function(){
    var script = {
 "horizontalAlign": "left",
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); this.mainPlayList.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "minHeight": 20,
 "contentOpaque": false,
 "scripts": {
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getKey": function(key){  return window[key]; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "existsKey": function(key){  return key in window; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "unregisterKey": function(key){  delete window[key]; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setMainMediaByIndex": function(index){  if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); } return this.mainPlayList.get('items')[index]; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var caller = playList.get('items')[index].get('media').get('id'); var resumeFunction = this.resumeGlobalAudios; var endFunction = function(){ if(playList.get('selectedIndex') != index) { resumeFunction(caller); } }; this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunction, endFunction); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "registerKey": function(key, value){  window[key] = value; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } }
 },
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 20,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 0,
 "desktopMipmappingEnabled": false,
 "mouseWheelEnabled": true,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "rootPlayer",
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "children": [
  "this.MainViewer",
  "this.Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_14F80305_1BED_F1EE_4193_B39F49D6928C",
  "this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08"
 ],
 "definitions": [{
 "id": "panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_camera",
 "initialSequence": {
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 26.89,
  "pitch": 36.65,
  "class": "PanoramaCameraPosition"
 }
},
{
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "media": "this.panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B"
  }
 ],
 "class": "PlayList"
},
{
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "mouseControlMode": "drag_acceleration",
 "gyroscopeVerticalDraggingEnabled": true,
 "touchControlMode": "drag_rotation",
 "class": "PanoramaPlayer",
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "buttonCardboardView": [
  "this.IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA",
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB"
 ],
 "displayPlaybackBar": true
},
{
 "id": "panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B",
 "thumbnailUrl": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_t.jpg",
 "label": "final-kulturhaus-wittenberge",
 "hfov": 360,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_t.jpg",
   "bottom": {
    "levels": [
     {
      "width": 2560,
      "tags": "ondemand",
      "height": 2560,
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "rowCount": 5,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/d/0/{row}_{column}.jpg"
     },
     {
      "width": 1536,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "rowCount": 3,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/d/1/{row}_{column}.jpg"
     },
     {
      "width": 1024,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/d/2/{row}_{column}.jpg"
     },
     {
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/d/3/{row}_{column}.jpg"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "width": 2560,
      "tags": "ondemand",
      "height": 2560,
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "rowCount": 5,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/r/0/{row}_{column}.jpg"
     },
     {
      "width": 1536,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "rowCount": 3,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/r/1/{row}_{column}.jpg"
     },
     {
      "width": 1024,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/r/2/{row}_{column}.jpg"
     },
     {
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/r/3/{row}_{column}.jpg"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "width": 2560,
      "tags": "ondemand",
      "height": 2560,
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "rowCount": 5,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/b/0/{row}_{column}.jpg"
     },
     {
      "width": 1536,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "rowCount": 3,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/b/1/{row}_{column}.jpg"
     },
     {
      "width": 1024,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/b/2/{row}_{column}.jpg"
     },
     {
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/b/3/{row}_{column}.jpg"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "width": 2560,
      "tags": "ondemand",
      "height": 2560,
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "rowCount": 5,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/l/0/{row}_{column}.jpg"
     },
     {
      "width": 1536,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "rowCount": 3,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/l/1/{row}_{column}.jpg"
     },
     {
      "width": 1024,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/l/2/{row}_{column}.jpg"
     },
     {
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/l/3/{row}_{column}.jpg"
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "width": 2560,
      "tags": "ondemand",
      "height": 2560,
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "rowCount": 5,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/f/0/{row}_{column}.jpg"
     },
     {
      "width": 1536,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "rowCount": 3,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/f/1/{row}_{column}.jpg"
     },
     {
      "width": 1024,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/f/2/{row}_{column}.jpg"
     },
     {
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/f/3/{row}_{column}.jpg"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "width": 2560,
      "tags": "ondemand",
      "height": 2560,
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "rowCount": 5,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/u/0/{row}_{column}.jpg"
     },
     {
      "width": 1536,
      "tags": "ondemand",
      "height": 1536,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "rowCount": 3,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/u/1/{row}_{column}.jpg"
     },
     {
      "width": 1024,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/u/2/{row}_{column}.jpg"
     },
     {
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "url": "media/panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_0/u/3/{row}_{column}.jpg"
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "vfov": 180,
 "hfovMin": "135%"
},
{
 "id": "mainPlayList",
 "items": [
  {
   "end": "this.trigger('tourEnded')",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B_camera",
   "media": "this.panorama_4980C56C_5E92_78C2_41D1_5665CF5E377B"
  }
 ],
 "class": "PlayList"
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "transparencyActive": true,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 0,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "width": 58,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "mode": "toggle",
 "height": 58,
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 58,
 "paddingBottom": 0,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "borderSize": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton FULLSCREEN"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 50,
 "left": 0,
 "toolTipShadowColor": "#333333",
 "progressRight": 0,
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorDirection": "vertical",
 "borderRadius": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "minWidth": 100,
 "propagateClick": true,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarHeadShadow": true,
 "progressBackgroundOpacity": 1,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadBorderSize": 0,
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "progressBarOpacity": 1,
 "toolTipBackgroundColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipPaddingRight": 10,
 "toolTipFontSize": 13,
 "playbackBarProgressBorderSize": 0,
 "borderSize": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "shadow": false,
 "toolTipOpacity": 0.5,
 "top": 0,
 "firstTransitionDuration": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderRadius": 0,
 "toolTipShadowSpread": 0,
 "progressBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressHeight": 10,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarBorderRadius": 0,
 "playbackBarBottom": 5,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "paddingTop": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "toolTipFontFamily": "Georgia",
 "toolTipPaddingLeft": 10,
 "progressBorderColor": "#000000",
 "toolTipFontWeight": "normal",
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "width": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingBottom": 7,
 "height": "100%",
 "playbackBarHeight": 10,
 "id": "MainViewer",
 "playbackBarHeadWidth": 6,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipBorderRadius": 3,
 "playbackBarRight": 0,
 "toolTipBorderSize": 1,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipFontColor": "#FFFFFF",
 "progressLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "transitionMode": "blending",
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipPaddingTop": 7,
 "playbackBarProgressBorderRadius": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadHeight": 15,
 "toolTipShadowOpacity": 0,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "data": {
  "name": "Main Viewer"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "left": "0%",
 "borderRadius": 0,
 "contentOpaque": false,
 "right": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "backgroundImageUrl": "skin/Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7.png",
 "id": "Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7",
 "children": [
  "this.Image_9511127C_9B79_D2C1_41D8_D080B87BFD84",
  "this.Container_9A7696F9_9256_4198_41E2_40E7CF09A427",
  "this.IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA"
 ],
 "gap": 10,
 "height": "12.832%",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "shadow": false,
 "paddingLeft": 0,
 "bottom": "0%",
 "data": {
  "name": "--- MENU"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "right": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "width": 115.05,
 "gap": 10,
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "height": 641,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "0%",
 "shadow": false,
 "backgroundOpacity": 0,
 "data": {
  "name": "-- SETTINGS"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "left": 25,
 "borderRadius": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 0,
 "horizontalAlign": "left",
 "width": 902,
 "scrollBarMargin": 2,
 "gap": 10,
 "id": "Container_14F80305_1BED_F1EE_4193_B39F49D6928C",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_14FBF305_1BED_F1EE_419A_A9F069FE2B28",
  "this.Label_14FBC305_1BED_F1EE_41B3_DAC14B1EE44E",
  "this.Label_14F82305_1BED_F1EE_41AD_7A6E6AD00A22"
 ],
 "height": 116,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": 10,
 "shadow": false,
 "backgroundOpacity": 0,
 "data": {
  "name": "--STICKER"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "left": "0%",
 "borderRadius": 0,
 "contentOpaque": false,
 "right": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95",
 "children": [
  "this.Container_04FF5C2C_1216_7593_41B2_1B5CFADF351D",
  "this.Container_04FF9C2D_1216_75ED_41A8_E3495D8F554E"
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, false, 0, null, null, false)",
 "paddingRight": 0,
 "scrollBarColor": "#04A3E1",
 "creationPolicy": "inAdvance",
 "overflow": "scroll",
 "class": "Container",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "0%",
 "shadow": false,
 "paddingLeft": 0,
 "bottom": "0%",
 "data": {
  "name": "--INFO"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "left": "0%",
 "borderRadius": 0,
 "contentOpaque": false,
 "right": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "overflow": "scroll",
 "class": "Container",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "0%",
 "shadow": false,
 "paddingLeft": 0,
 "bottom": "0%",
 "data": {
  "name": "--PANORAMA LIST"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "left": "0%",
 "borderRadius": 0,
 "contentOpaque": false,
 "right": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F",
 "children": [
  "this.Container_1813AA3E_1663_8BF1_41A2_CA5EE3718362",
  "this.Container_1812AA3F_1663_8BEF_41A4_02F566B1BC6D"
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F, false, 0, null, null, false)",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "overflow": "scroll",
 "class": "Container",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "0%",
 "shadow": false,
 "paddingLeft": 0,
 "bottom": "0%",
 "data": {
  "name": "--LOCATION"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "left": "0%",
 "borderRadius": 0,
 "contentOpaque": false,
 "right": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "overflow": "scroll",
 "class": "Container",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "0%",
 "shadow": false,
 "paddingLeft": 0,
 "bottom": "0%",
 "data": {
  "name": "--FLOORPLAN"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "left": "0%",
 "borderRadius": 0,
 "contentOpaque": false,
 "right": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "overflow": "scroll",
 "class": "Container",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "0%",
 "shadow": false,
 "paddingLeft": 0,
 "bottom": "0%",
 "data": {
  "name": "--PHOTOALBUM"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "left": "0%",
 "borderRadius": 0,
 "contentOpaque": false,
 "right": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08",
 "children": [
  "this.Container_0DEF7FEC_12FA_D293_4197_332CA20EDBCF",
  "this.Container_0DEC1FED_12FA_D26D_41AE_8CE7699C44D8"
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "overflow": "scroll",
 "class": "Container",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "0%",
 "shadow": false,
 "paddingLeft": 0,
 "bottom": "0%",
 "data": {
  "name": "--CONTACT"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "transparencyActive": true,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 0,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "width": 58,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "mode": "toggle",
 "height": 58,
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 58,
 "paddingBottom": 0,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "borderSize": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton MUTE"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "transparencyActive": true,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 0,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "width": 58,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "mode": "toggle",
 "height": 58,
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 58,
 "paddingBottom": 0,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "borderSize": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton HS "
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "transparencyActive": true,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 0,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "width": 58,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "mode": "toggle",
 "height": 58,
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 58,
 "paddingBottom": 0,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "borderSize": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton GYRO"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "transparencyActive": true,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "right": 30,
 "rollOverIconURL": "skin/IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA_rollover.png",
 "minWidth": 1,
 "propagateClick": true,
 "iconURL": "skin/IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA.png",
 "paddingTop": 0,
 "width": 49,
 "id": "IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA",
 "mode": "push",
 "height": 37,
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 49,
 "paddingBottom": 0,
 "maxHeight": 37,
 "verticalAlign": "middle",
 "borderSize": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "bottom": 8,
 "data": {
  "name": "IconButton VR"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "transparencyActive": true,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 0,
 "width": 58,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "mode": "push",
 "height": 58,
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 58,
 "visible": false,
 "paddingBottom": 0,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "borderSize": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton VR"
 }
},
{
 "horizontalAlign": "center",
 "minHeight": 1,
 "backgroundOpacity": 0,
 "left": "0%",
 "borderRadius": 0,
 "right": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 0,
 "scaleMode": "fit_outside",
 "id": "Image_9511127C_9B79_D2C1_41D8_D080B87BFD84",
 "height": 2,
 "paddingRight": 0,
 "url": "skin/Image_9511127C_9B79_D2C1_41D8_D080B87BFD84.png",
 "class": "Image",
 "maxWidth": 3000,
 "paddingBottom": 0,
 "maxHeight": 2,
 "verticalAlign": "middle",
 "borderSize": 0,
 "shadow": false,
 "paddingLeft": 0,
 "bottom": 53,
 "data": {
  "name": "white line"
 }
},
{
 "minHeight": 1,
 "left": "0%",
 "borderRadius": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "horizontal",
 "paddingTop": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "width": 1199,
 "gap": 10,
 "id": "Container_9A7696F9_9256_4198_41E2_40E7CF09A427",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_03D37B27_0C7A_63B3_41A1_89572D8C8762",
  "this.Button_1FDDCF4A_0C0A_23FD_417A_1C14E098FDFD",
  "this.Button_1CA392FC_0C0A_2295_41A3_18DEA65FB6AD",
  "this.Button_1FE4B611_0C0A_256F_418E_EA27E66F8360",
  "this.Button_1EBF3282_0C0A_1D6D_4190_52FC7F8C00A5",
  "this.Button_33E0F47E_11C1_A20D_419F_BB809AD89259"
 ],
 "height": 51,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "middle",
 "borderSize": 0,
 "paddingLeft": 30,
 "shadow": false,
 "backgroundOpacity": 0,
 "bottom": "0%",
 "data": {
  "name": "-button set container"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "right": "0%",
 "horizontalAlign": "center",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "width": 110,
 "gap": 10,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "height": 110,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "middle",
 "borderSize": 0,
 "top": "0%",
 "shadow": false,
 "backgroundOpacity": 0,
 "data": {
  "name": "button menu sup"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "contentOpaque": false,
 "right": "0%",
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 3,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "height": "85.959%",
 "width": "91.304%",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "bottom": "0%",
 "data": {
  "name": "-button set"
 }
},
{
 "overflow": "scroll",
 "paddingLeft": 0,
 "minHeight": 1,
 "left": 5,
 "borderRadius": 0,
 "shadowColor": "#000000",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 10,
 "shadowSpread": 1,
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "gap": 10,
 "backgroundColor": [
  "#A67C52"
 ],
 "id": "Container_14FBF305_1BED_F1EE_419A_A9F069FE2B28",
 "scrollBarOpacity": 0.5,
 "width": 10,
 "height": 90,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "class": "Container",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": 24,
 "shadow": true,
 "shadowOpacity": 0.5,
 "backgroundOpacity": 1,
 "shadowHorizontalLength": 0,
 "data": {
  "name": "color block"
 }
},
{
 "textDecoration": "none",
 "paddingLeft": 0,
 "fontFamily": "Cinzel Bold",
 "minHeight": 1,
 "textShadowBlurRadius": 10,
 "left": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "fontStyle": "normal",
 "minWidth": 1,
 "propagateClick": true,
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "text": "Kultur- und Festspielhaus",
 "width": 758.5,
 "textShadowHorizontalLength": 0,
 "textShadowColor": "#000000",
 "id": "Label_14FBC305_1BED_F1EE_41B3_DAC14B1EE44E",
 "textShadowVerticalLength": 0,
 "height": 80,
 "textShadowOpacity": 1,
 "paddingRight": 0,
 "class": "Label",
 "paddingBottom": 0,
 "verticalAlign": "top",
 "borderSize": 0,
 "top": 15,
 "shadow": false,
 "fontWeight": "bold",
 "backgroundOpacity": 0,
 "fontSize": "50px",
 "data": {
  "name": "text 1"
 }
},
{
 "textDecoration": "none",
 "paddingLeft": 0,
 "fontFamily": "Cinzel Bold",
 "minHeight": 1,
 "textShadowBlurRadius": 10,
 "left": 4,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "fontStyle": "normal",
 "minWidth": 1,
 "propagateClick": true,
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "text": "Wittenberge",
 "width": 287,
 "textShadowHorizontalLength": 0,
 "textShadowColor": "#000000",
 "id": "Label_14F82305_1BED_F1EE_41AD_7A6E6AD00A22",
 "textShadowVerticalLength": 0,
 "height": 37,
 "textShadowOpacity": 1,
 "paddingRight": 0,
 "class": "Label",
 "paddingBottom": 0,
 "verticalAlign": "top",
 "borderSize": 0,
 "top": 88,
 "shadow": false,
 "fontWeight": "normal",
 "backgroundOpacity": 0,
 "fontSize": 26,
 "data": {
  "name": "text 2"
 }
},
{
 "horizontalAlign": "left",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "left": "10%",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "contentOpaque": false,
 "right": "10%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "id": "Container_04FF5C2C_1216_7593_41B2_1B5CFADF351D",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_04FF2C2C_1216_7593_4195_88C3C7049763",
  "this.Container_04FF0C2C_1216_7593_419A_8AC354592A51"
 ],
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "5%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "bottom": "5%",
 "data": {
  "name": "Global"
 }
},
{
 "horizontalAlign": "right",
 "minHeight": 1,
 "backgroundOpacity": 0,
 "left": "10%",
 "borderRadius": 0,
 "contentOpaque": false,
 "right": "10%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "paddingTop": 20,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_04FF9C2D_1216_75ED_41A8_E3495D8F554E",
 "children": [
  "this.IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A"
 ],
 "paddingRight": 20,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "5%",
 "shadow": false,
 "paddingLeft": 0,
 "bottom": "84.02%",
 "data": {
  "name": "Container X global"
 }
},
{
 "horizontalAlign": "center",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "left": "15%",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "contentOpaque": false,
 "right": "15%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "7%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "bottom": "7%",
 "data": {
  "name": "Global"
 }
},
{
 "horizontalAlign": "left",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "left": "10%",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "contentOpaque": false,
 "right": "10%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "id": "Container_1813AA3E_1663_8BF1_41A2_CA5EE3718362",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_1813DA3E_1663_8BF1_4193_F28A53801FBC",
  "this.Container_1813FA3E_1663_8BF1_4180_5027A2A87866"
 ],
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "5%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "bottom": "5%",
 "data": {
  "name": "Global"
 }
},
{
 "horizontalAlign": "right",
 "minHeight": 1,
 "backgroundOpacity": 0,
 "left": "10%",
 "borderRadius": 0,
 "contentOpaque": false,
 "right": "10%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "paddingTop": 20,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_1812AA3F_1663_8BEF_41A4_02F566B1BC6D",
 "children": [
  "this.IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1"
 ],
 "paddingRight": 20,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "5%",
 "shadow": false,
 "paddingLeft": 0,
 "bottom": "80%",
 "data": {
  "name": "Container X global"
 }
},
{
 "horizontalAlign": "center",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "left": "15%",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "contentOpaque": false,
 "right": "15%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
  "this.MapViewer"
 ],
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "7%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "bottom": "7%",
 "data": {
  "name": "Global"
 }
},
{
 "horizontalAlign": "center",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "left": "15%",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "contentOpaque": false,
 "right": "15%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "paddingTop": 10,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "paddingRight": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "7%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "paddingLeft": 10,
 "bottom": "7%",
 "data": {
  "name": "Global"
 }
},
{
 "horizontalAlign": "left",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "left": "10%",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "contentOpaque": false,
 "right": "10%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "id": "Container_0DEF7FEC_12FA_D293_4197_332CA20EDBCF",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_0DEC9FEC_12FA_D293_41A0_DAD5B350B643",
  "this.Container_0DECBFED_12FA_D26D_41AD_EE1B8CC7BCC8"
 ],
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "5%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "bottom": "5%",
 "data": {
  "name": "Global"
 }
},
{
 "horizontalAlign": "right",
 "minHeight": 1,
 "backgroundOpacity": 0,
 "left": "10%",
 "borderRadius": 0,
 "contentOpaque": false,
 "right": "10%",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "paddingTop": 20,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_0DEC1FED_12FA_D26D_41AE_8CE7699C44D8",
 "children": [
  "this.IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4"
 ],
 "paddingRight": 20,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "borderSize": 0,
 "top": "5%",
 "shadow": false,
 "paddingLeft": 0,
 "bottom": "84.67%",
 "data": {
  "name": "Container X global"
 }
},
{
 "paddingLeft": 0,
 "fontFamily": "Cinzel Bold",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "horizontalAlign": "center",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "minWidth": 1,
 "propagateClick": true,
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "shadowBlurRadius": 15,
 "width": 120,
 "gap": 5,
 "id": "Button_03D37B27_0C7A_63B3_41A1_89572D8C8762",
 "mode": "push",
 "height": 40,
 "label": "HOUSE INFO",
 "borderColor": "#000000",
 "shadowSpread": 1,
 "paddingRight": 0,
 "backgroundColor": [
  "#000000"
 ],
 "iconWidth": 0,
 "pressedBackgroundOpacity": 0,
 "rollOverShadow": false,
 "class": "Button",
 "iconHeight": 0,
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, true, 0, null, null, false)",
 "visible": false,
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "pressedFontColor": "#000000",
 "verticalAlign": "middle",
 "borderSize": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "bold",
 "textDecoration": "none",
 "backgroundOpacity": 0,
 "cursor": "hand",
 "fontSize": 14,
 "data": {
  "name": "Button house info"
 },
 "rollOverFontColor": "#DB9B4D"
},
{
 "paddingLeft": 0,
 "fontFamily": "Cinzel Bold",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "horizontalAlign": "center",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "minWidth": 1,
 "propagateClick": true,
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "shadowBlurRadius": 15,
 "width": 140,
 "gap": 5,
 "id": "Button_1FDDCF4A_0C0A_23FD_417A_1C14E098FDFD",
 "mode": "push",
 "height": 40,
 "label": "PANORAMA LIST",
 "borderColor": "#000000",
 "shadowSpread": 1,
 "paddingRight": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "iconWidth": 32,
 "pressedBackgroundOpacity": 0,
 "class": "Button",
 "iconHeight": 32,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "visible": false,
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "pressedFontColor": "#000000",
 "verticalAlign": "middle",
 "borderSize": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "bold",
 "textDecoration": "none",
 "backgroundOpacity": 0,
 "cursor": "hand",
 "fontSize": 14,
 "data": {
  "name": "Button panorama list"
 },
 "rollOverFontColor": "#DB9B4D"
},
{
 "paddingLeft": 0,
 "fontFamily": "Cinzel Bold",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "horizontalAlign": "center",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "minWidth": 1,
 "propagateClick": true,
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "shadowBlurRadius": 15,
 "width": 100,
 "gap": 5,
 "id": "Button_1CA392FC_0C0A_2295_41A3_18DEA65FB6AD",
 "mode": "push",
 "height": 40,
 "label": "LOCATION",
 "borderColor": "#000000",
 "shadowSpread": 1,
 "paddingRight": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "iconWidth": 32,
 "pressedBackgroundOpacity": 0,
 "class": "Button",
 "iconHeight": 32,
 "click": "this.setComponentVisibility(this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F, true, 0, null, null, false)",
 "visible": false,
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "pressedFontColor": "#000000",
 "verticalAlign": "middle",
 "borderSize": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "bold",
 "textDecoration": "none",
 "backgroundOpacity": 0,
 "cursor": "hand",
 "fontSize": 14,
 "data": {
  "name": "Button location"
 },
 "rollOverFontColor": "#DB9B4D"
},
{
 "paddingLeft": 0,
 "fontFamily": "Cinzel Bold",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "horizontalAlign": "center",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "minWidth": 1,
 "propagateClick": true,
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "shadowBlurRadius": 15,
 "width": 113,
 "gap": 5,
 "id": "Button_1FE4B611_0C0A_256F_418E_EA27E66F8360",
 "mode": "push",
 "height": 40,
 "label": "FLOORPLAN",
 "borderColor": "#000000",
 "shadowSpread": 1,
 "paddingRight": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "iconWidth": 32,
 "pressedBackgroundOpacity": 0,
 "class": "Button",
 "iconHeight": 32,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "visible": false,
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "pressedFontColor": "#000000",
 "verticalAlign": "middle",
 "borderSize": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "bold",
 "textDecoration": "none",
 "backgroundOpacity": 0,
 "cursor": "hand",
 "fontSize": 14,
 "data": {
  "name": "Button floorplan"
 },
 "rollOverFontColor": "#DB9B4D"
},
{
 "paddingLeft": 0,
 "fontFamily": "Cinzel Bold",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "horizontalAlign": "center",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "minWidth": 1,
 "propagateClick": true,
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "shadowBlurRadius": 15,
 "width": 122,
 "gap": 5,
 "id": "Button_1EBF3282_0C0A_1D6D_4190_52FC7F8C00A5",
 "mode": "push",
 "height": 40,
 "label": "PHOTOALBUM",
 "borderColor": "#000000",
 "shadowSpread": 1,
 "paddingRight": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "iconWidth": 32,
 "pressedBackgroundOpacity": 0,
 "class": "Button",
 "iconHeight": 32,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "visible": false,
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "pressedFontColor": "#000000",
 "verticalAlign": "middle",
 "borderSize": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "bold",
 "textDecoration": "none",
 "backgroundOpacity": 0,
 "cursor": "hand",
 "fontSize": 14,
 "data": {
  "name": "Button photoalbum"
 },
 "rollOverFontColor": "#DB9B4D"
},
{
 "paddingLeft": 0,
 "fontFamily": "Cinzel Bold",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "horizontalAlign": "center",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "minWidth": 1,
 "propagateClick": true,
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "shadowBlurRadius": 15,
 "width": 100,
 "gap": 5,
 "id": "Button_33E0F47E_11C1_A20D_419F_BB809AD89259",
 "mode": "push",
 "height": 40,
 "label": "CONTACT",
 "borderColor": "#000000",
 "shadowSpread": 1,
 "paddingRight": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "iconWidth": 32,
 "pressedBackgroundOpacity": 0,
 "class": "Button",
 "iconHeight": 32,
 "click": "this.setComponentVisibility(this.Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08, true, 0, null, null, false)",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "pressedFontColor": "#000000",
 "verticalAlign": "middle",
 "borderSize": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "bold",
 "textDecoration": "none",
 "backgroundOpacity": 0,
 "cursor": "hand",
 "fontSize": 14,
 "data": {
  "name": "Button contact"
 },
 "rollOverFontColor": "#DB9B4D"
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "transparencyActive": true,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 0,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "width": 60,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "mode": "toggle",
 "height": 60,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 60,
 "paddingBottom": 0,
 "maxHeight": 60,
 "verticalAlign": "middle",
 "borderSize": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "data": {
  "name": "image button menu"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "transparencyActive": true,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 0,
 "width": 58,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "mode": "push",
 "height": 58,
 "click": "this.shareTwitter(window.location.href)",
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 58,
 "paddingBottom": 0,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "borderSize": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton TWITTER"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "transparencyActive": true,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 0,
 "width": 58,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "mode": "push",
 "height": 58,
 "click": "this.shareFacebook(window.location.href)",
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 58,
 "paddingBottom": 0,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "borderSize": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton FB"
 }
},
{
 "horizontalAlign": "center",
 "minHeight": 1,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 10,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_04FF2C2C_1216_7593_4195_88C3C7049763",
 "children": [
  "this.Image_04FF3C2C_1216_7593_41AF_91EA0BBCCE77"
 ],
 "backgroundColor": [
  "#FFFFFF"
 ],
 "width": "50%",
 "paddingRight": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 10,
 "height": "100%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "middle",
 "shadow": false,
 "paddingLeft": 10,
 "data": {
  "name": "-left"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 450,
 "propagateClick": true,
 "layout": "vertical",
 "paddingTop": 20,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.51,
 "gap": 0,
 "id": "Container_04FF0C2C_1216_7593_419A_8AC354592A51",
 "children": [
  "this.Container_04FF1C2C_1216_7593_417B_D7E74ABC91E3",
  "this.Container_04FFEC2C_1216_7593_41A4_4CD23AB66B04",
  "this.Container_04FF8C2D_1216_75ED_41A5_B4FCB592F167"
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "50%",
 "paddingRight": 60,
 "scrollBarColor": "#0069A3",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 20,
 "height": "100%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 60,
 "data": {
  "name": "-right"
 }
},
{
 "horizontalAlign": "center",
 "minHeight": 50,
 "backgroundOpacity": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A.png",
 "borderRadius": 0,
 "minWidth": 50,
 "propagateClick": true,
 "paddingTop": 0,
 "pressedIconURL": "skin/IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A_pressed.png",
 "rollOverIconURL": "skin/IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A_rollover.png",
 "width": "25%",
 "id": "IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A",
 "mode": "push",
 "height": "75%",
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, false, 0, null, null, false)",
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 60,
 "paddingBottom": 0,
 "maxHeight": 60,
 "verticalAlign": "middle",
 "borderSize": 0,
 "shadow": false,
 "paddingLeft": 0,
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "overflow": "visible",
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "children": [
  "this.HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "height": 90,
 "width": "100%",
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingBottom": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "header"
 }
},
{
 "itemThumbnailWidth": 220,
 "minHeight": 1,
 "itemThumbnailOpacity": 1,
 "selectedItemLabelFontColor": "#987B55",
 "scrollBarWidth": 10,
 "borderRadius": 5,
 "itemVerticalAlign": "top",
 "minWidth": 1,
 "propagateClick": true,
 "itemPaddingLeft": 3,
 "itemLabelFontFamily": "Times New Roman",
 "paddingLeft": 70,
 "rollOverItemThumbnailShadow": true,
 "itemMaxHeight": 1000,
 "scrollBarOpacity": 0.5,
 "selectedItemLabelFontWeight": "bold",
 "selectedItemThumbnailShadow": true,
 "itemBackgroundColorRatios": [],
 "selectedItemThumbnailShadowBlurRadius": 16,
 "paddingRight": 70,
 "class": "ThumbnailGrid",
 "rollOverItemLabelFontColor": "#987B55",
 "scrollBarVisible": "rollOver",
 "itemLabelGap": 7,
 "itemLabelFontStyle": "normal",
 "itemHeight": 156,
 "itemThumbnailHeight": 125,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "borderSize": 0,
 "itemMaxWidth": 1000,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "shadow": false,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemLabelPosition": "bottom",
 "backgroundOpacity": 0,
 "itemBackgroundOpacity": 0,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemLabelTextDecoration": "none",
 "scrollBarMargin": 2,
 "paddingTop": 10,
 "itemThumbnailShadow": false,
 "itemMinHeight": 50,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "width": "100%",
 "gap": 26,
 "itemOpacity": 1,
 "itemThumbnailScaleMode": "fit_outside",
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "height": "100%",
 "itemThumbnailBorderRadius": 0,
 "itemPaddingRight": 3,
 "itemMode": "normal",
 "scrollBarColor": "#987B55",
 "itemLabelFontColor": "#666666",
 "itemWidth": 220,
 "itemHorizontalAlign": "center",
 "itemMinWidth": 50,
 "paddingBottom": 70,
 "itemBackgroundColorDirection": "vertical",
 "itemBackgroundColor": [],
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "verticalAlign": "middle",
 "data": {
  "name": "ThumbnailList5161"
 },
 "itemLabelFontWeight": "bold",
 "rollOverItemThumbnailShadowColor": "#987B55",
 "horizontalAlign": "center",
 "itemLabelFontSize": 14,
 "itemPaddingBottom": 3,
 "itemBorderRadius": 0,
 "itemLabelHorizontalAlign": "center",
 "itemPaddingTop": 3
},
{
 "horizontalAlign": "center",
 "minHeight": 1,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 10,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_1813DA3E_1663_8BF1_4193_F28A53801FBC",
 "children": [
  "this.WebFrame_198A3B12_1666_89B6_41B5_4C2585EFD00E"
 ],
 "backgroundColor": [
  "#FFFFFF"
 ],
 "width": "70%",
 "paddingRight": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 10,
 "height": "100%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "middle",
 "shadow": false,
 "paddingLeft": 10,
 "data": {
  "name": "-left"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 400,
 "propagateClick": true,
 "layout": "vertical",
 "paddingTop": 40,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.51,
 "gap": 0,
 "id": "Container_1813FA3E_1663_8BF1_4180_5027A2A87866",
 "children": [
  "this.Container_18121A3E_1663_8BF1_41B4_AB4C2B45EFFF",
  "this.Container_18120A3E_1663_8BF1_419D_69232EA5FB3D",
  "this.Container_18128A3F_1663_8BEF_41B6_51D1938FA48A"
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "30%",
 "paddingRight": 50,
 "scrollBarColor": "#0069A3",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 20,
 "height": "100%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 40,
 "data": {
  "name": "-right"
 }
},
{
 "horizontalAlign": "center",
 "minHeight": 50,
 "backgroundOpacity": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1.png",
 "borderRadius": 0,
 "minWidth": 50,
 "propagateClick": true,
 "paddingTop": 0,
 "pressedIconURL": "skin/IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1_pressed.png",
 "rollOverIconURL": "skin/IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1_rollover.png",
 "width": "25%",
 "id": "IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1",
 "mode": "push",
 "height": "75%",
 "click": "this.setComponentVisibility(this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F, false, 0, null, null, false)",
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 60,
 "paddingBottom": 0,
 "maxHeight": 60,
 "verticalAlign": "middle",
 "borderSize": 0,
 "shadow": false,
 "paddingLeft": 0,
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "overflow": "visible",
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "children": [
  "this.HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "height": 90,
 "width": "100%",
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingBottom": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "header"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "progressBarBorderColor": "#000000",
 "toolTipShadowColor": "#333333",
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "borderRadius": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "propagateClick": true,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderRadius": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarHeadShadow": true,
 "progressBackgroundOpacity": 1,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadBorderSize": 0,
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "progressBarOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipTextShadowBlurRadius": 3,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipPaddingRight": 6,
 "toolTipFontSize": 12,
 "playbackBarProgressBorderSize": 0,
 "borderSize": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "shadow": false,
 "toolTipOpacity": 1,
 "toolTipShadowSpread": 0,
 "firstTransitionDuration": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderRadius": 0,
 "progressBottom": 2,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressHeight": 10,
 "toolTipShadowVerticalLength": 0,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarBorderRadius": 0,
 "playbackBarBottom": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "paddingTop": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "toolTipFontFamily": "Arial",
 "toolTipPaddingLeft": 6,
 "progressBorderColor": "#000000",
 "toolTipFontWeight": "normal",
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "width": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingBottom": 4,
 "height": "100%",
 "playbackBarHeight": 10,
 "id": "MapViewer",
 "playbackBarHeadWidth": 6,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipBorderRadius": 3,
 "playbackBarRight": 0,
 "toolTipBorderSize": 1,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipFontColor": "#606060",
 "progressLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "transitionMode": "blending",
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarProgressOpacity": 1,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBorderRadius": 0,
 "playbackBarBorderSize": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "data": {
  "name": "Floor Plan"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 0,
 "height": "100%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Container photo"
 }
},
{
 "horizontalAlign": "center",
 "minHeight": 1,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 10,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_0DEC9FEC_12FA_D293_41A0_DAD5B350B643",
 "children": [
  "this.Image_0DEC8FEC_12FA_D26C_4162_7A2BAB1DA270"
 ],
 "backgroundColor": [
  "#FFFFFF"
 ],
 "width": "85%",
 "paddingRight": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 10,
 "height": "100%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "middle",
 "shadow": false,
 "paddingLeft": 10,
 "data": {
  "name": "-left"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 460,
 "propagateClick": true,
 "layout": "vertical",
 "paddingTop": 20,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.51,
 "gap": 0,
 "id": "Container_0DECBFED_12FA_D26D_41AD_EE1B8CC7BCC8",
 "children": [
  "this.Container_0DECAFED_12FA_D26D_4191_988031ED4C85",
  "this.Container_0DECDFED_12FA_D26D_41A3_11915FF353DB",
  "this.Container_0DECEFED_12FA_D26D_4184_68D80FD2C88F"
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "50%",
 "paddingRight": 50,
 "scrollBarColor": "#0069A3",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 20,
 "height": "100%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 50,
 "data": {
  "name": "-right"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 50,
 "transparencyActive": true,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "iconURL": "skin/IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4.png",
 "rollOverIconURL": "skin/IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4_rollover.png",
 "minWidth": 50,
 "propagateClick": true,
 "paddingTop": 0,
 "pressedIconURL": "skin/IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4_pressed.png",
 "width": 60,
 "id": "IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4",
 "mode": "push",
 "height": 60,
 "click": "this.setComponentVisibility(this.Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08, false, 0, null, null, false)",
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 60,
 "paddingBottom": 0,
 "maxHeight": 60,
 "verticalAlign": "middle",
 "borderSize": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "horizontalAlign": "center",
 "minHeight": 1,
 "backgroundOpacity": 0,
 "left": "0%",
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 0,
 "scaleMode": "fit_outside",
 "width": "100%",
 "id": "Image_04FF3C2C_1216_7593_41AF_91EA0BBCCE77",
 "height": "100%",
 "paddingRight": 0,
 "url": "skin/Image_04FF3C2C_1216_7593_41AF_91EA0BBCCE77.jpg",
 "class": "Image",
 "maxWidth": 2000,
 "paddingBottom": 0,
 "maxHeight": 1000,
 "verticalAlign": "bottom",
 "borderSize": 0,
 "top": "0%",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Image"
 }
},
{
 "overflow": "scroll",
 "horizontalAlign": "right",
 "minHeight": 0,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "horizontal",
 "paddingTop": 20,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 0,
 "id": "Container_04FF1C2C_1216_7593_417B_D7E74ABC91E3",
 "width": "100%",
 "height": 40,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingBottom": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Container space"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 300,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 100,
 "propagateClick": true,
 "layout": "vertical",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.79,
 "gap": 0,
 "id": "Container_04FFEC2C_1216_7593_41A4_4CD23AB66B04",
 "children": [
  "this.Container_095ED5F6_1BEA_B02B_41B1_5247CD8872B4",
  "this.Container_0BD17D93_1236_F6B5_4193_247950F46092",
  "this.Container_04FFDC2C_1216_7593_41A7_64E2588509FB"
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#E73B2C",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 0,
 "height": "100%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Container text"
 }
},
{
 "overflow": "scroll",
 "paddingLeft": 0,
 "minHeight": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "horizontal",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "width": 370,
 "gap": 10,
 "id": "Container_04FF8C2D_1216_75ED_41A5_B4FCB592F167",
 "scrollBarOpacity": 0.5,
 "height": 40,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingBottom": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "backgroundOpacity": 0.3,
 "data": {
  "name": "Container space"
 }
},
{
 "minHeight": 100,
 "backgroundOpacity": 0,
 "left": "0%",
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 36,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "id": "HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
 "width": "77.115%",
 "height": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "class": "HTMLText",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "borderSize": 0,
 "top": "0%",
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#987b55;font-size:3.67vh;font-family:'Otama.ep';\"><B>PANORAMA LIST:</B></SPAN></SPAN></DIV></div>",
 "shadow": false,
 "paddingLeft": 80,
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 50,
 "transparencyActive": true,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "right": 20,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.png",
 "minWidth": 50,
 "propagateClick": true,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.png",
 "paddingTop": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.png",
 "width": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "mode": "push",
 "height": 60,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 60,
 "paddingBottom": 0,
 "maxHeight": 60,
 "verticalAlign": "top",
 "borderSize": 0,
 "top": 20,
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "minHeight": 1,
 "backgroundOpacity": 1,
 "left": "0%",
 "borderRadius": 0,
 "right": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0
 ],
 "scrollEnabled": true,
 "id": "WebFrame_198A3B12_1666_89B6_41B5_4C2585EFD00E",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "insetBorder": false,
 "paddingRight": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.874102370473!2d2.335449951395685!3d48.860611079186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671d877937b0f%3A0xb975fcfa192f84d4!2sMuseo+del+Louvre!5e0!3m2!1ses!2ses!4v1542366357291\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "class": "WebFrame",
 "paddingBottom": 0,
 "borderSize": 0,
 "top": "0%",
 "shadow": false,
 "paddingLeft": 0,
 "bottom": "0%",
 "data": {
  "name": "WebFrame5113"
 }
},
{
 "overflow": "scroll",
 "horizontalAlign": "right",
 "minHeight": 0,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "horizontal",
 "paddingTop": 20,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 0,
 "id": "Container_18121A3E_1663_8BF1_41B4_AB4C2B45EFFF",
 "width": "100%",
 "height": 60,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingBottom": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Container space"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 520,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 100,
 "propagateClick": true,
 "layout": "vertical",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.79,
 "gap": 10,
 "id": "Container_18120A3E_1663_8BF1_419D_69232EA5FB3D",
 "children": [
  "this.Container_00680EBB_1C6A_B01A_41B7_CA8C74B88FBB",
  "this.Container_18124A3F_1663_8BEF_4167_4F797ED9B565",
  "this.HTMLText_18127A3F_1663_8BEF_4175_B0DF8CE38BFE",
  "this.Button_18126A3F_1663_8BEF_41A4_B0EDA1A5F4E3"
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#E73B2C",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 30,
 "height": "100%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Container text"
 }
},
{
 "overflow": "scroll",
 "paddingLeft": 0,
 "minHeight": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "horizontal",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "width": 370,
 "gap": 10,
 "id": "Container_18128A3F_1663_8BEF_41B6_51D1938FA48A",
 "scrollBarOpacity": 0.5,
 "height": 40,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingBottom": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "backgroundOpacity": 0.3,
 "data": {
  "name": "Container space"
 }
},
{
 "minHeight": 100,
 "backgroundOpacity": 0,
 "left": "0%",
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 36,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "id": "HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
 "width": "77.115%",
 "height": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "class": "HTMLText",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "borderSize": 0,
 "top": "0%",
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.67vh;font-family:'Cinzel Bold';\"><B>floorplan/</B></SPAN></SPAN></DIV></div>",
 "shadow": false,
 "paddingLeft": 80,
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 50,
 "transparencyActive": true,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "right": 20,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.png",
 "minWidth": 50,
 "propagateClick": true,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.png",
 "paddingTop": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.png",
 "width": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "mode": "push",
 "height": 60,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 60,
 "paddingBottom": 0,
 "maxHeight": 60,
 "verticalAlign": "top",
 "borderSize": 0,
 "top": 20,
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton54739"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "left": "0%",
 "toolTipShadowColor": "#333333",
 "progressRight": 0,
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorDirection": "vertical",
 "borderRadius": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "propagateClick": true,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderRadius": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarHeadShadow": true,
 "progressBackgroundOpacity": 1,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadBorderSize": 0,
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "progressBarOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipTextShadowBlurRadius": 3,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipPaddingRight": 6,
 "toolTipFontSize": 12,
 "playbackBarProgressBorderSize": 0,
 "borderSize": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "shadow": false,
 "toolTipOpacity": 1,
 "top": "0%",
 "firstTransitionDuration": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderRadius": 0,
 "toolTipShadowSpread": 0,
 "progressBottom": 2,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressHeight": 10,
 "toolTipShadowVerticalLength": 0,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarBorderRadius": 0,
 "playbackBarBottom": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "paddingTop": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "toolTipFontFamily": "Arial",
 "toolTipPaddingLeft": 6,
 "progressBorderColor": "#000000",
 "toolTipFontWeight": "normal",
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "width": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingBottom": 4,
 "height": "100%",
 "playbackBarHeight": 10,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "playbackBarHeadWidth": 6,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipBorderRadius": 3,
 "playbackBarRight": 0,
 "toolTipBorderSize": 1,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipFontColor": "#606060",
 "progressLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "transitionMode": "blending",
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBorderRadius": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadHeight": 15,
 "toolTipShadowOpacity": 1,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "data": {
  "name": "Viewer photoalbum 1"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 50,
 "transparencyActive": false,
 "left": 10,
 "borderRadius": 0,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "horizontalAlign": "center",
 "minWidth": 50,
 "propagateClick": true,
 "paddingTop": 0,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "width": 165,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "mode": "push",
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 60,
 "paddingBottom": 0,
 "maxHeight": 60,
 "verticalAlign": "middle",
 "borderSize": 0,
 "top": "20%",
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "bottom": "20%",
 "data": {
  "name": "IconButton <"
 }
},
{
 "horizontalAlign": "center",
 "minHeight": 50,
 "backgroundOpacity": 0,
 "transparencyActive": false,
 "right": 10,
 "borderRadius": 0,
 "minWidth": 50,
 "propagateClick": true,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "paddingTop": 0,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "width": "14%",
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "mode": "push",
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 60,
 "paddingBottom": 0,
 "maxHeight": 60,
 "verticalAlign": "middle",
 "borderSize": 0,
 "top": "20%",
 "shadow": false,
 "paddingLeft": 0,
 "cursor": "hand",
 "bottom": "20%",
 "data": {
  "name": "IconButton >"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 50,
 "transparencyActive": true,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "right": 20,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.png",
 "minWidth": 50,
 "propagateClick": true,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.png",
 "paddingTop": 0,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.png",
 "width": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "mode": "push",
 "height": 60,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "paddingRight": 0,
 "class": "IconButton",
 "maxWidth": 60,
 "paddingBottom": 0,
 "maxHeight": 60,
 "verticalAlign": "top",
 "borderSize": 0,
 "top": 20,
 "shadow": false,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton X"
 }
},
{
 "horizontalAlign": "right",
 "minHeight": 1,
 "backgroundOpacity": 0,
 "left": "0%",
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 0,
 "scaleMode": "fit_outside",
 "width": "100%",
 "id": "Image_0DEC8FEC_12FA_D26C_4162_7A2BAB1DA270",
 "height": "100%",
 "paddingRight": 0,
 "url": "skin/Image_0DEC8FEC_12FA_D26C_4162_7A2BAB1DA270.jpg",
 "class": "Image",
 "maxWidth": 2000,
 "paddingBottom": 0,
 "maxHeight": 1000,
 "verticalAlign": "middle",
 "borderSize": 0,
 "top": "0%",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Image"
 }
},
{
 "overflow": "scroll",
 "horizontalAlign": "right",
 "minHeight": 0,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "horizontal",
 "paddingTop": 20,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 0,
 "id": "Container_0DECAFED_12FA_D26D_4191_988031ED4C85",
 "width": "100%",
 "height": 40,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingBottom": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Container space"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 300,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 100,
 "propagateClick": true,
 "layout": "vertical",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.79,
 "gap": 10,
 "id": "Container_0DECDFED_12FA_D26D_41A3_11915FF353DB",
 "children": [
  "this.Container_38BF7F5E_1C3A_D01A_41B5_74C8E50916F2",
  "this.Container_30C72FD2_121E_72B7_4185_0FFA7496FDA6",
  "this.HTMLText_0DECCFED_12FA_D26D_418B_9646D02C4859",
  "this.Button_0DECFFED_12FA_D26D_419B_F907711405D7"
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#E73B2C",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 30,
 "height": "100%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Container text"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "minWidth": 1,
 "propagateClick": true,
 "layout": "horizontal",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "width": 370,
 "gap": 10,
 "id": "Container_0DECEFED_12FA_D26D_4184_68D80FD2C88F",
 "scrollBarOpacity": 0.5,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 0,
 "height": "2.54%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "backgroundOpacity": 0.3,
 "data": {
  "name": "Container space"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0,
 "gap": 10,
 "id": "Container_095ED5F6_1BEA_B02B_41B1_5247CD8872B4",
 "children": [
  "this.HTMLText_04FFCC2C_1216_7593_41A3_D345BDE131A2"
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "paddingBottom": 0,
 "height": "30%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Container header"
 }
},
{
 "overflow": "scroll",
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_0BD17D93_1236_F6B5_4193_247950F46092",
 "width": "100%",
 "height": 7,
 "paddingRight": 0,
 "backgroundColor": [
  "#000000"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingBottom": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "line"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "horizontal",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 22,
 "id": "Container_04FFDC2C_1216_7593_41A7_64E2588509FB",
 "children": [
  "this.HTMLText_0B1CF751_121B_B3B2_41AA_8DF6E24BB6F1",
  "this.HTMLText_04FFBC2C_1216_7593_41A4_E1B06B145F04"
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 0,
 "height": "75%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "- content"
 }
},
{
 "overflow": "scroll",
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 20,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0,
 "gap": 10,
 "id": "Container_00680EBB_1C6A_B01A_41B7_CA8C74B88FBB",
 "children": [
  "this.HTMLText_18123A3E_1663_8BF1_419F_B7BD72D2053B",
  "this.HTMLText_18125A3F_1663_8BEF_4196_AE566E10BAFC"
 ],
 "height": 130,
 "width": "100%",
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingBottom": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Container header location"
 }
},
{
 "overflow": "scroll",
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_18124A3F_1663_8BEF_4167_4F797ED9B565",
 "width": "100%",
 "height": 7,
 "paddingRight": 0,
 "backgroundColor": [
  "#000000"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingBottom": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "line"
 }
},
{
 "minHeight": 1,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "id": "HTMLText_18127A3F_1663_8BEF_4175_B0DF8CE38BFE",
 "width": "100%",
 "height": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#987B55",
 "class": "HTMLText",
 "paddingBottom": 20,
 "scrollBarVisible": "rollOver",
 "borderSize": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#987b55;font-size:2.64vh;font-family:'Antonio';\"><B>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. MAECENAS CONGUE EROS MAGNA, ID BIBENDUM EROS MALESUADA VITAE.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.67vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.15vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.72vh;font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\"> line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.72vh;font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\"> line 2</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.72vh;font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\"> line 3</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.72vh;font-family:'Open Sans Semibold';\">GPS:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\"> xxxxxxxxxx</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.72vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.15vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "HTMLText"
 }
},
{
 "paddingLeft": 0,
 "fontFamily": "Antonio",
 "minHeight": 1,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "horizontalAlign": "center",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 1,
 "fontStyle": "normal",
 "minWidth": 1,
 "propagateClick": true,
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "shadowBlurRadius": 6,
 "width": 207,
 "gap": 5,
 "id": "Button_18126A3F_1663_8BEF_41A4_B0EDA1A5F4E3",
 "mode": "push",
 "height": 59,
 "label": "BOOK NOW",
 "borderColor": "#000000",
 "shadowSpread": 1,
 "paddingRight": 0,
 "backgroundColor": [
  "#987B55"
 ],
 "iconWidth": 32,
 "pressedBackgroundOpacity": 1,
 "class": "Button",
 "iconHeight": 32,
 "click": "this.openLink('http://www.loremipsum.com', '_blank')",
 "visible": false,
 "paddingBottom": 0,
 "borderSize": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "shadow": false,
 "fontWeight": "bold",
 "textDecoration": "none",
 "backgroundOpacity": 0.7,
 "cursor": "hand",
 "fontSize": 30,
 "data": {
  "name": "Button31015"
 }
},
{
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0,
 "gap": 10,
 "id": "Container_38BF7F5E_1C3A_D01A_41B5_74C8E50916F2",
 "children": [
  "this.HTMLText_335E39B6_12FA_FEFE_41AA_91C449696299"
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "paddingBottom": 0,
 "height": "44%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Container header contact"
 }
},
{
 "overflow": "scroll",
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "id": "Container_30C72FD2_121E_72B7_4185_0FFA7496FDA6",
 "width": "100%",
 "height": 7,
 "paddingRight": 0,
 "backgroundColor": [
  "#000000"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingBottom": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Container25772"
 }
},
{
 "minHeight": 1,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "id": "HTMLText_0DECCFED_12FA_D26D_418B_9646D02C4859",
 "width": "100%",
 "height": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#987B55",
 "class": "HTMLText",
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver",
 "borderSize": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#987b55;font-size:3.67vh;font-family:'Antonio';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.67vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.15vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#987b55;font-size:3.67vh;font-family:'Antonio';\"><B>CONTACT:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.72vh;font-family:'Open Sans Semibold';\">E-mail:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\"> Info@loremipsum.com </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.72vh;font-family:'Open Sans Semibold';\">Web: </SPAN><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\">www.loremipsum.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.72vh;font-family:'Open Sans Semibold';\">Tlf.:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\"> +11 111 111 111</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.72vh;font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\"> line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\">Address line 2</SPAN></SPAN></DIV></div>",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "HTMLText"
 }
},
{
 "horizontalAlign": "center",
 "fontFamily": "Antonio",
 "minHeight": 30,
 "backgroundOpacity": 0.7,
 "shadowColor": "#000000",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "rollOverBackgroundOpacity": 1,
 "borderRadius": 0,
 "fontStyle": "normal",
 "minWidth": 1,
 "propagateClick": true,
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "backgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "shadowBlurRadius": 6,
 "gap": 5,
 "id": "Button_0DECFFED_12FA_D26D_419B_F907711405D7",
 "shadowSpread": 1,
 "mode": "push",
 "backgroundColor": [
  "#987B55"
 ],
 "label": "BOOK NOW",
 "borderColor": "#000000",
 "width": "35%",
 "paddingRight": 0,
 "iconWidth": 32,
 "pressedBackgroundOpacity": 1,
 "height": "12%",
 "class": "Button",
 "iconHeight": 32,
 "click": "this.openLink('http://www.loremipsum.com', '_blank')",
 "paddingBottom": 0,
 "borderSize": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "shadow": false,
 "fontWeight": "bold",
 "textDecoration": "none",
 "paddingLeft": 0,
 "cursor": "hand",
 "fontSize": "3.26vh",
 "data": {
  "name": "Button31015"
 }
},
{
 "minHeight": 1,
 "backgroundOpacity": 0,
 "left": "0%",
 "borderRadius": 0,
 "right": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0,
 "id": "HTMLText_04FFCC2C_1216_7593_41A3_D345BDE131A2",
 "height": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#996633",
 "class": "HTMLText",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "borderSize": 0,
 "top": "0%",
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.19vh;font-family:'Cinzel Bold';\"><B>LOREM</B></SPAN><SPAN STYLE=\"font-size:6.19vh;font-family:'Otama.ep';\"><B>/</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:10.78vh;font-family:'Cinzel Bold';\"><B>IPSUM</B></SPAN></SPAN></DIV></div>",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "HTMLText18899"
 }
},
{
 "minHeight": 1,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "scrollBarMargin": 2,
 "paddingTop": 20,
 "scrollBarOpacity": 0.5,
 "id": "HTMLText_0B1CF751_121B_B3B2_41AA_8DF6E24BB6F1",
 "width": "50%",
 "height": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#987B55",
 "class": "HTMLText",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "borderSize": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#987b55;font-size:2.75vh;font-family:'Antonio';\"><B>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. MAECENAS CONGHE EROS MAGNA.</B></SPAN><SPAN STYLE=\"font-size:1.72vh;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.72vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.15vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\">Proin sit amet pharetra magna. Donec varius eu nisi at facilisis. Vivamus nibh magna, fermentum ac nibh sit amet, euismod efficitur sem. Fusce blandit, purus sed gravida vulputate, justo quam laoreet quam, et dictum mauris arcu vitae justo. </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.72vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.15vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\">Vivamus euismod condimentum ligula quis feugiat. Cras imperdiet tortor mi, a posuere velit tempus et. Maecenas et scelerisque turpis. Quisque in gravida leo, sed dapibus nibh. Ut at consequat turpis. Curabitur et tempor ex, aliquet interdum quam. Aliquam erat volutpat. </SPAN></SPAN></DIV></div>",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "HTMLText12940"
 }
},
{
 "minHeight": 1,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "scrollBarMargin": 2,
 "paddingTop": 20,
 "scrollBarOpacity": 0.5,
 "id": "HTMLText_04FFBC2C_1216_7593_41A4_E1B06B145F04",
 "width": "50%",
 "height": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#987B55",
 "class": "HTMLText",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "borderSize": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.72vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.15vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\">Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.72vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.15vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\">Integer eget pulvinar urna, et tincidunt sem. Suspendisse imperdiet tincidunt risus id mollis. Vivamus suscipit dui sit amet tortor pellentesque, ac laoreet tortor finibus. Nulla maximus urna id sagittis ultricies. Suspendisse in mi sit amet nisi rutrum sodales non eu elit. Integer cursus, odio nec efficitur fermentum.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.72vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.15vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.72vh;font-family:'Open Sans Semibold';\">Ut sed mattis ipsum. Curabitur blandit hendrerit nisi ac feugiat.</SPAN></SPAN></DIV></div>",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "HTMLText19460"
 }
},
{
 "minHeight": 1,
 "backgroundOpacity": 0,
 "left": "0%",
 "borderRadius": 0,
 "right": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "id": "HTMLText_18123A3E_1663_8BF1_419F_B7BD72D2053B",
 "height": 85,
 "paddingRight": 0,
 "scrollBarColor": "#BBD149",
 "class": "HTMLText",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "borderSize": 0,
 "top": "0%",
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.28vh;font-family:'Cinzel Bold';\"><B>HOUSE</B></SPAN></SPAN></DIV></div>",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "HTMLText23803"
 }
},
{
 "paddingLeft": 0,
 "minHeight": 1,
 "left": "0%",
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minWidth": 1,
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "id": "HTMLText_18125A3F_1663_8BEF_4196_AE566E10BAFC",
 "width": "100%",
 "height": 65,
 "paddingRight": 0,
 "scrollBarColor": "#BBD149",
 "class": "HTMLText",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "borderSize": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:50px;font-family:'Cinzel Bold';\"><B>LOCATION</B></SPAN></SPAN></DIV></div>",
 "shadow": false,
 "backgroundOpacity": 0,
 "bottom": 0,
 "data": {
  "name": "HTMLText24905"
 }
},
{
 "minHeight": 1,
 "backgroundOpacity": 0,
 "left": "0%",
 "borderRadius": 0,
 "right": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0,
 "id": "HTMLText_335E39B6_12FA_FEFE_41AA_91C449696299",
 "height": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#BBD149",
 "class": "HTMLText",
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "borderSize": 0,
 "top": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.19vh;font-family:'Cinzel Bold';\"><B>CONTACT</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:11.01vh;font-family:'Cinzel Bold';\"><B>INFO</B></SPAN></SPAN></DIV></div>",
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "HTMLText23803"
 }
}],
 "width": "100%",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "vrPolyfillScale": 0.5,
 "overflow": "visible",
 "class": "Player",
 "paddingBottom": 0,
 "height": "100%",
 "mobileMipmappingEnabled": false,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "backgroundPreloadEnabled": true,
 "shadow": false,
 "paddingLeft": 0,
 "data": {
  "name": "Player468"
 },
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
