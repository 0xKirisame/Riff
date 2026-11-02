'use strict';

/* ---------------------------------------------------------------- i18n --- */

const I18N = {
  en: {
    'nav.library': 'Library',
    'nav.downloads': 'Downloads',
    'nav.playlists': 'Playlists',
    'nav.newPlaylist': 'New playlist',
    'nav.settings': 'Settings',
    'library.eyebrow': 'Collection',
    'library.title': 'Your Library',
    'library.subtitle': 'Everything you love, right here on your Mac.',
    'library.recent': 'Recently added',
    'library.songs': 'Songs',
    'library.emptyTitle': 'Your library is quiet',
    'library.emptyBody': 'Add songs from your Mac, or paste a link and Riff will download it for you.',
    'library.emptyDownload': 'Download from a link',
    'library.noResults': 'No songs match your search.',
    'library.songCount': '{n} songs',
    'library.songCountOne': '1 song',
    'library.minutes': '{n} min',
    'search.placeholder': 'Search songs, artists, albums…',
    'sort.label': 'Sort',
    'sort.recent': 'Recently added',
    'sort.title': 'Title',
    'sort.artist': 'Artist',
    'sort.duration': 'Duration',
    'action.play': 'Play',
    'action.pause': 'Pause',
    'action.next': 'Next',
    'action.previous': 'Previous',
    'action.shuffle': 'Shuffle',
    'action.repeat': 'Repeat',
    'action.more': 'More options',
    'action.addToPlaylist': 'Add to playlist',
    'action.reveal': 'Show in Finder',
    'action.remove': 'Remove from library',
    'action.playAll': 'Play all',
    'action.shufflePlay': 'Shuffle',
    'action.import': 'Add music',
    'action.importFiles': 'Add files…',
    'action.importFolder': 'Add a folder…',
    'action.cancel': 'Cancel',
    'action.confirm': 'Confirm',
    'action.save': 'Save',
    'action.delete': 'Delete',
    'action.rename': 'Rename',
    'action.create': 'Create',
    'action.close': 'Close',
    'action.back': 'Back',
    'action.showInFinder': 'Show in Finder',
    'action.paste': 'Paste',
    'action.fetch': 'Get info',
    'action.retry': 'Try again',
    'action.download': 'Download',
    'action.mute': 'Mute',
    'action.unmute': 'Unmute',
    'action.addSongs': 'Add songs',
    'import.busy': 'Adding music…',
    'unknownArtist': 'Unknown artist',
    'unknownAlbum': 'Unknown album',
    'player.notPlaying': 'Nothing playing',
    'player.selectSong': 'Pick a song to start',
    'table.title': 'Title',
    'table.artist': 'Artist',
    'table.album': 'Album',
    'table.time': 'Time',
    'playlist.eyebrow': 'Playlist',
    'playlist.emptyTitle': 'This playlist is empty',
    'playlist.emptyBody': 'Add songs from your library to build this playlist.',
    'playlist.addSongs': 'Add songs',
    'playlist.searchPlaceholder': 'Search your library…',
    'playlist.allAdded': 'Every song is already in this playlist.',
    'playlist.created': 'Playlist created',
    'playlist.addedOne': 'Added to “{name}”',
    'playlist.addedMany': 'Added {n} songs to “{name}”',
    'playlist.namePlaceholder': 'My playlist',
    'playlist.newTitle': 'New playlist',
    'playlist.renameTitle': 'Rename playlist',
    'playlist.deleteTitle': 'Delete playlist?',
    'playlist.deleteBody': '“{name}” will be removed. Your song files stay on your Mac.',
    'playlist.removeFromPlaylist': 'Remove from playlist',
    'playlist.addSelected': 'Add {n}',
    'downloads.eyebrow': 'Save from the web',
    'downloads.title': 'Download music',
    'downloads.subtitle': 'Paste a link from YouTube, SoundCloud, Bandcamp, Vimeo, and more. Riff saves it to your library with artwork and tags.',
    'downloads.urlPlaceholder': 'Paste a song link…',
    'downloads.hint': 'Single songs only. Playlist links download the first track.',
    'downloads.fetching': 'Reading link…',
    'downloads.preview': 'Ready to download',
    'downloads.format': 'Format',
    'downloads.quality': 'Quality',
    'downloads.qualityBest': 'Best',
    'downloads.qualityHigh': '320 kbps',
    'downloads.qualityStandard': '192 kbps',
    'downloads.start': 'Download song',
    'downloads.addToQueue': 'Add to queue',
    'downloads.starting': 'Starting…',
    'downloads.done': 'Saved to your library',
    'downloads.doneBody': '“{title}” is ready to play.',
    'downloads.failed': 'Download failed',
    'downloads.cancelled': 'Download cancelled',
    'downloads.cancelBody': 'Nothing was added to your library.',
    'downloads.cancelDownload': 'Cancel download',
    'downloads.unknownTitle': 'New download',
    'downloads.by': 'by {artist}',
    'downloads.downloaded': 'Downloaded',
    'downloads.historyEmpty': 'Links you download will appear here.',
    'downloads.toolsTitle': 'A couple of helpers are missing',
    'downloads.toolsBody': 'Riff uses yt-dlp and ffmpeg to save links. Install them with Homebrew, then relaunch Riff.',
    'downloads.install': 'brew install yt-dlp ffmpeg',
    'downloads.errorPrefix': 'Could not download that link',
    'downloads.urlMissing': 'Paste a link first',
    'downloads.busy': 'Another download is still running',
    'downloads.viewLibrary': 'Play now',
    'downloads.newDownload': 'New download',
    'downloads.serverHint': 'Your files stay on this Mac.',
    'downloads.audio': 'Audio',
    'downloads.phase.preparing': 'Getting ready',
    'downloads.phase.downloading': 'Downloading audio',
    'downloads.phase.converting': 'Converting audio',
    'downloads.phase.tagging': 'Adding artwork & tags',
    'downloads.phase.importing': 'Adding to your library',
    'downloads.queue': 'Download queue',
    'downloads.queueEmpty': 'Paste a link and it will wait here.',
    'downloads.queueAdded': 'Added to the queue',
    'downloads.queueDuplicate': 'That link is already waiting in the queue',
    'downloads.queued': 'Waiting',
    'downloads.cancelledBody': 'Cancelled before it finished. You can retry it.',
    'downloads.retry': 'Retry',
    'downloads.retryAll': 'Retry failed',
    'downloads.retryQueued': 'Retrying…',
    'downloads.nothingToRetry': 'Nothing to retry',
    'downloads.clearFinished': 'Clear finished',
    'downloads.remove': 'Remove',
    'settings.eyebrow': 'Preferences',
    'settings.title': 'Settings',
    'settings.subtitle': 'Make Riff yours.',
    'settings.language': 'Language',
    'settings.languageBody': 'The interface adapts to Arabic and Japanese, including right-to-left layouts.',
    'settings.auto': 'Automatic',
    'settings.downloads': 'Downloads',
    'settings.downloadFolder': 'Save links to',
    'settings.format': 'Audio format',
    'settings.quality': 'Quality',
    'settings.chooseFolder': 'Change…',
    'settings.library': 'Library',
    'settings.libraryBody': 'Your songs are referenced in place. Riff never moves or deletes your files.',
    'settings.openDownloads': 'Open download folder',
    'settings.openData': 'Open app data',
    'settings.about': 'About Riff',
    'settings.aboutBody': 'A local music player for macOS, built with Rust. Your music never leaves your Mac.',
    'settings.version': 'Version {version}',
    'settings.stats': '{tracks} songs · {playlists} playlists',
    'settings.shortcuts': 'Keyboard shortcuts',
    'settings.shortcutPlay': 'Play / pause',
    'settings.shortcutSeek': 'Seek 5 seconds',
    'settings.shortcutVolume': 'Volume',
    'settings.shortcutSearch': 'Search library',
    'settings.shortcutImport': 'Add music',
    'lang.auto': 'Automatic',
    'lang.en': 'English',
    'lang.ar': 'العربية',
    'lang.ja': '日本語',
    'toast.imported': 'Added {n} songs',
    'toast.importedOne': 'Added 1 song',
    'toast.importedSkipped': 'Added {n} songs · {skipped} already in your library',
    'toast.noAudio': 'No supported audio files were found',
    'toast.importFailed': 'Some files could not be added',
    'toast.removed': 'Removed from your library',
    'toast.removedFromPlaylist': 'Removed from playlist',
    'toast.duplicate': 'Already in your library',
    'toast.addedToPlaylist': 'Added to “{name}”',
    'toast.pasted': 'Link pasted',
    'toast.pasteFailed': 'Press ⌘V to paste into the field',
    'toast.error': 'Something went wrong',
    'toast.trackMissing': 'This file has moved or been deleted',
    'toast.playError': 'Could not play this file',
    'toast.playlistCreated': 'Playlist created',
    'toast.playlistRenamed': 'Playlist renamed',
    'toast.playlistDeleted': 'Playlist deleted',
    'confirm.removeTitle': 'Remove from library?',
    'confirm.removeBody': 'The song will disappear from Riff. The file stays on your Mac.',
    'confirm.removePlaylistBody': 'This song will be removed from the playlist. The file stays on your Mac.',
  },
  ar: {
    'nav.library': 'المكتبة',
    'nav.downloads': 'التنزيلات',
    'nav.playlists': 'قوائم التشغيل',
    'nav.newPlaylist': 'قائمة جديدة',
    'nav.settings': 'الإعدادات',
    'library.eyebrow': 'المجموعة',
    'library.title': 'مكتبتك',
    'library.subtitle': 'كل ما تحبه، في مكان واحد على جهازك.',
    'library.recent': 'أُضيفت مؤخرًا',
    'library.songs': 'الأغاني',
    'library.emptyTitle': 'مكتبتك هادئة',
    'library.emptyBody': 'أضف أغاني من جهازك، أو الصق رابطًا وسينزّلها ريف لك.',
    'library.emptyDownload': 'تنزيل من رابط',
    'library.noResults': 'لا توجد أغانٍ تطابق بحثك.',
    'library.songCount': '{n} من الأغاني',
    'library.songCountOne': 'أغنية واحدة',
    'library.minutes': '{n} دقيقة',
    'search.placeholder': 'ابحث عن أغانٍ أو فنانين أو ألبومات…',
    'sort.label': 'ترتيب',
    'sort.recent': 'الأحدث',
    'sort.title': 'العنوان',
    'sort.artist': 'الفنان',
    'sort.duration': 'المدة',
    'action.play': 'تشغيل',
    'action.pause': 'إيقاف مؤقت',
    'action.next': 'التالي',
    'action.previous': 'السابق',
    'action.shuffle': 'عشوائي',
    'action.repeat': 'تكرار',
    'action.more': 'خيارات أكثر',
    'action.addToPlaylist': 'إضافة إلى قائمة',
    'action.reveal': 'إظهار في Finder',
    'action.remove': 'إزالة من المكتبة',
    'action.playAll': 'تشغيل الكل',
    'action.shufflePlay': 'تشغيل عشوائي',
    'action.import': 'إضافة موسيقى',
    'action.importFiles': 'إضافة ملفات…',
    'action.importFolder': 'إضافة مجلد…',
    'action.cancel': 'إلغاء',
    'action.confirm': 'تأكيد',
    'action.save': 'حفظ',
    'action.delete': 'حذف',
    'action.rename': 'إعادة تسمية',
    'action.create': 'إنشاء',
    'action.close': 'إغلاق',
    'action.back': 'رجوع',
    'action.showInFinder': 'إظهار في Finder',
    'action.paste': 'لصق',
    'action.fetch': 'جلب المعلومات',
    'action.retry': 'إعادة المحاولة',
    'action.download': 'تنزيل',
    'action.mute': 'كتم الصوت',
    'action.unmute': 'تشغيل الصوت',
    'action.addSongs': 'إضافة أغانٍ',
    'import.busy': 'جارٍ إضافة الموسيقى…',
    'unknownArtist': 'فنان غير معروف',
    'unknownAlbum': 'ألبوم غير معروف',
    'player.notPlaying': 'لا شيء قيد التشغيل',
    'player.selectSong': 'اختر أغنية للبدء',
    'table.title': 'العنوان',
    'table.artist': 'الفنان',
    'table.album': 'الألبوم',
    'table.time': 'المدة',
    'playlist.eyebrow': 'قائمة تشغيل',
    'playlist.emptyTitle': 'هذه القائمة فارغة',
    'playlist.emptyBody': 'أضف أغاني من مكتبتك لبناء هذه القائمة.',
    'playlist.addSongs': 'إضافة أغانٍ',
    'playlist.searchPlaceholder': 'ابحث في مكتبتك…',
    'playlist.allAdded': 'كل الأغاني موجودة في هذه القائمة بالفعل.',
    'playlist.created': 'تم إنشاء القائمة',
    'playlist.addedOne': 'أُضيفت إلى «{name}»',
    'playlist.addedMany': 'أُضيفت {n} أغانٍ إلى «{name}»',
    'playlist.namePlaceholder': 'قائمتي',
    'playlist.newTitle': 'قائمة تشغيل جديدة',
    'playlist.renameTitle': 'إعادة تسمية القائمة',
    'playlist.deleteTitle': 'حذف القائمة؟',
    'playlist.deleteBody': 'ستُحذف «{name}». ستبقى ملفات أغانيك على جهازك.',
    'playlist.removeFromPlaylist': 'إزالة من القائمة',
    'playlist.addSelected': 'إضافة {n}',
    'downloads.eyebrow': 'احفظ من الإنترنت',
    'downloads.title': 'تنزيل الموسيقى',
    'downloads.subtitle': 'الصق رابطًا من يوتيوب أو ساوند كلاود أو باندكامب أو فيميو وغيرها. يحفظه ريف في مكتبتك مع الغلاف والبيانات.',
    'downloads.urlPlaceholder': 'الصق رابط أغنية…',
    'downloads.hint': 'أغانٍ فردية فقط. روابط قوائم التشغيل تنزّل الأغنية الأولى.',
    'downloads.fetching': 'جارٍ قراءة الرابط…',
    'downloads.preview': 'جاهز للتنزيل',
    'downloads.format': 'الصيغة',
    'downloads.quality': 'الجودة',
    'downloads.qualityBest': 'الأفضل',
    'downloads.qualityHigh': '320 كيلوبت/ث',
    'downloads.qualityStandard': '192 كيلوبت/ث',
    'downloads.start': 'تنزيل الأغنية',
    'downloads.addToQueue': 'أضف إلى قائمة الانتظار',
    'downloads.starting': 'جارٍ البدء…',
    'downloads.done': 'تم الحفظ في مكتبتك',
    'downloads.doneBody': '«{title}» جاهزة للتشغيل.',
    'downloads.failed': 'فشل التنزيل',
    'downloads.cancelled': 'أُلغي التنزيل',
    'downloads.cancelBody': 'لم تتم إضافة شيء إلى مكتبتك.',
    'downloads.cancelDownload': 'إلغاء التنزيل',
    'downloads.unknownTitle': 'تنزيل جديد',
    'downloads.by': 'بواسطة {artist}',
    'downloads.downloaded': 'تم تنزيلها',
    'downloads.historyEmpty': 'ستظهر هنا الروابط التي تنزّلها.',
    'downloads.toolsTitle': 'هناك أداتان مفقودتان',
    'downloads.toolsBody': 'يستخدم ريف yt-dlp وffmpeg لحفظ الروابط. ثبّتهما عبر Homebrew ثم أعد تشغيل ريف.',
    'downloads.install': 'brew install yt-dlp ffmpeg',
    'downloads.errorPrefix': 'تعذّر تنزيل هذا الرابط',
    'downloads.urlMissing': 'الصق رابطًا أولًا',
    'downloads.busy': 'هناك تنزيل آخر قيد التشغيل',
    'downloads.viewLibrary': 'شغّلها الآن',
    'downloads.newDownload': 'تنزيل جديد',
    'downloads.serverHint': 'ملفاتك تبقى على هذا الجهاز.',
    'downloads.audio': 'صوت',
    'downloads.phase.preparing': 'جارٍ التحضير',
    'downloads.phase.downloading': 'جارٍ تنزيل الصوت',
    'downloads.phase.converting': 'جارٍ تحويل الصوت',
    'downloads.phase.tagging': 'إضافة الغلاف والبيانات',
    'downloads.phase.importing': 'إضافة إلى مكتبتك',
    'downloads.queue': 'قائمة التنزيل',
    'downloads.queueEmpty': 'الصق رابطًا وسينتظر هنا.',
    'downloads.queueAdded': 'أُضيف إلى قائمة الانتظار',
    'downloads.queueDuplicate': 'هذا الرابط في قائمة الانتظار بالفعل',
    'downloads.queued': 'في الانتظار',
    'downloads.cancelledBody': 'أُلغي قبل أن يكتمل. يمكنك إعادة المحاولة.',
    'downloads.retry': 'إعادة المحاولة',
    'downloads.retryAll': 'إعادة محاولة الفاشلة',
    'downloads.retryQueued': 'جارٍ إعادة المحاولة…',
    'downloads.nothingToRetry': 'لا شيء لإعادة محاولته',
    'downloads.clearFinished': 'مسح المكتملة',
    'downloads.remove': 'إزالة',
    'settings.eyebrow': 'التفضيلات',
    'settings.title': 'الإعدادات',
    'settings.subtitle': 'اجعل ريف على ذوقك.',
    'settings.language': 'اللغة',
    'settings.languageBody': 'تتكيف الواجهة مع العربية واليابانية، بما في ذلك التخطيط من اليمين إلى اليسار.',
    'settings.auto': 'تلقائي',
    'settings.downloads': 'التنزيلات',
    'settings.downloadFolder': 'حفظ الروابط في',
    'settings.format': 'صيغة الصوت',
    'settings.quality': 'الجودة',
    'settings.chooseFolder': 'تغيير…',
    'settings.library': 'المكتبة',
    'settings.libraryBody': 'تُشار إلى أغانيك في مكانها. لا ينقل ريف ملفاتك أو يحذفها.',
    'settings.openDownloads': 'فتح مجلد التنزيلات',
    'settings.openData': 'فتح بيانات التطبيق',
    'settings.about': 'حول ريف',
    'settings.aboutBody': 'مشغّل موسيقى محلي لنظام macOS، مبني بلغة Rust. موسيقاك لا تغادر جهازك.',
    'settings.version': 'الإصدار {version}',
    'settings.stats': '{tracks} أغنية · {playlists} قائمة',
    'settings.shortcuts': 'اختصارات لوحة المفاتيح',
    'settings.shortcutPlay': 'تشغيل / إيقاف مؤقت',
    'settings.shortcutSeek': 'تقديم 5 ثوانٍ',
    'settings.shortcutVolume': 'مستوى الصوت',
    'settings.shortcutSearch': 'البحث في المكتبة',
    'settings.shortcutImport': 'إضافة موسيقى',
    'lang.auto': 'تلقائي',
    'lang.en': 'English',
    'lang.ar': 'العربية',
    'lang.ja': '日本語',
    'toast.imported': 'أُضيفت {n} أغانٍ',
    'toast.importedOne': 'أُضيفت أغنية واحدة',
    'toast.importedSkipped': 'أُضيفت {n} أغانٍ · {skipped} موجودة مسبقًا',
    'toast.noAudio': 'لم يتم العثور على ملفات صوت مدعومة',
    'toast.importFailed': 'تعذّرت إضافة بعض الملفات',
    'toast.removed': 'أُزيلت من مكتبتك',
    'toast.removedFromPlaylist': 'أُزيلت من القائمة',
    'toast.duplicate': 'موجودة مسبقًا في مكتبتك',
    'toast.addedToPlaylist': 'أُضيفت إلى «{name}»',
    'toast.pasted': 'تم لصق الرابط',
    'toast.pasteFailed': 'اضغط ⌘V للصق في الحقل',
    'toast.error': 'حدث خطأ ما',
    'toast.trackMissing': 'هذا الملف نُقل أو حُذف',
    'toast.playError': 'تعذّر تشغيل هذا الملف',
    'toast.playlistCreated': 'تم إنشاء القائمة',
    'toast.playlistRenamed': 'تمت إعادة تسمية القائمة',
    'toast.playlistDeleted': 'تم حذف القائمة',
    'confirm.removeTitle': 'إزالة من المكتبة؟',
    'confirm.removeBody': 'ستختفي الأغنية من ريف. سيبقى الملف على جهازك.',
    'confirm.removePlaylistBody': 'ستُزال هذه الأغنية من القائمة. سيبقى الملف على جهازك.',
  },
  ja: {
    'nav.library': 'ライブラリ',
    'nav.downloads': 'ダウンロード',
    'nav.playlists': 'プレイリスト',
    'nav.newPlaylist': '新しいプレイリスト',
    'nav.settings': '設定',
    'library.eyebrow': 'コレクション',
    'library.title': 'ライブラリ',
    'library.subtitle': '好きな音楽を、このMacにひとつに。',
    'library.recent': '最近追加した曲',
    'library.songs': '曲',
    'library.emptyTitle': 'ライブラリはまだ静かです',
    'library.emptyBody': 'Macから曲を追加するか、リンクを貼り付けてダウンロードしましょう。',
    'library.emptyDownload': 'リンクからダウンロード',
    'library.noResults': '検索に一致する曲がありません。',
    'library.songCount': '{n}曲',
    'library.songCountOne': '1曲',
    'library.minutes': '{n}分',
    'search.placeholder': '曲、アーティスト、アルバムを検索…',
    'sort.label': '並び替え',
    'sort.recent': '追加日',
    'sort.title': 'タイトル',
    'sort.artist': 'アーティスト',
    'sort.duration': '長さ',
    'action.play': '再生',
    'action.pause': '一時停止',
    'action.next': '次へ',
    'action.previous': '前へ',
    'action.shuffle': 'シャッフル',
    'action.repeat': 'リピート',
    'action.more': 'その他のオプション',
    'action.addToPlaylist': 'プレイリストに追加',
    'action.reveal': 'Finderで表示',
    'action.remove': 'ライブラリから削除',
    'action.playAll': 'すべて再生',
    'action.shufflePlay': 'シャッフル再生',
    'action.import': '音楽を追加',
    'action.importFiles': 'ファイルを追加…',
    'action.importFolder': 'フォルダを追加…',
    'action.cancel': 'キャンセル',
    'action.confirm': '確認',
    'action.save': '保存',
    'action.delete': '削除',
    'action.rename': '名前を変更',
    'action.create': '作成',
    'action.close': '閉じる',
    'action.back': '戻る',
    'action.showInFinder': 'Finderで表示',
    'action.paste': '貼り付け',
    'action.fetch': '情報を取得',
    'action.retry': '再試行',
    'action.download': 'ダウンロード',
    'action.mute': 'ミュート',
    'action.unmute': 'ミュート解除',
    'action.addSongs': '曲を追加',
    'import.busy': '音楽を追加中…',
    'unknownArtist': '不明なアーティスト',
    'unknownAlbum': '不明なアルバム',
    'player.notPlaying': '再生していません',
    'player.selectSong': '曲を選んで再生',
    'table.title': 'タイトル',
    'table.artist': 'アーティスト',
    'table.album': 'アルバム',
    'table.time': '長さ',
    'playlist.eyebrow': 'プレイリスト',
    'playlist.emptyTitle': 'このプレイリストは空です',
    'playlist.emptyBody': 'ライブラリから曲を追加しましょう。',
    'playlist.addSongs': '曲を追加',
    'playlist.searchPlaceholder': 'ライブラリを検索…',
    'playlist.allAdded': 'すべての曲が追加済みです。',
    'playlist.created': 'プレイリストを作成しました',
    'playlist.addedOne': '「{name}」に追加しました',
    'playlist.addedMany': '「{name}」に{n}曲追加しました',
    'playlist.namePlaceholder': 'マイプレイリスト',
    'playlist.newTitle': '新しいプレイリスト',
    'playlist.renameTitle': 'プレイリスト名を変更',
    'playlist.deleteTitle': 'プレイリストを削除しますか？',
    'playlist.deleteBody': '「{name}」を削除します。曲のファイルはMacに残ります。',
    'playlist.removeFromPlaylist': 'プレイリストから削除',
    'playlist.addSelected': '{n}曲を追加',
    'downloads.eyebrow': 'ウェブから保存',
    'downloads.title': '音楽をダウンロード',
    'downloads.subtitle': 'YouTube、SoundCloud、Bandcamp、Vimeoなどのリンクを貼り付けてください。アートワークとタグ付きでライブラリに保存します。',
    'downloads.urlPlaceholder': '曲のリンクを貼り付け…',
    'downloads.hint': '単曲のみ対応。プレイリストのリンクは最初の曲を保存します。',
    'downloads.fetching': 'リンクを読み込み中…',
    'downloads.preview': 'ダウンロードの準備完了',
    'downloads.format': '形式',
    'downloads.quality': '品質',
    'downloads.qualityBest': '最高',
    'downloads.qualityHigh': '320 kbps',
    'downloads.qualityStandard': '192 kbps',
    'downloads.start': '曲をダウンロード',
    'downloads.addToQueue': 'キューに追加',
    'downloads.starting': '開始中…',
    'downloads.done': 'ライブラリに保存しました',
    'downloads.doneBody': '「{title}」を再生できます。',
    'downloads.failed': 'ダウンロードに失敗しました',
    'downloads.cancelled': 'ダウンロードをキャンセルしました',
    'downloads.cancelBody': 'ライブラリには何も追加されていません。',
    'downloads.cancelDownload': 'ダウンロードをキャンセル',
    'downloads.unknownTitle': '新しいダウンロード',
    'downloads.by': '{artist}',
    'downloads.downloaded': 'ダウンロード済み',
    'downloads.historyEmpty': 'ダウンロードした曲がここに表示されます。',
    'downloads.toolsTitle': '必要なツールがありません',
    'downloads.toolsBody': 'リンクの保存にはyt-dlpとffmpegを使用します。HomebrewでインストールしてRiffを再起動してください。',
    'downloads.install': 'brew install yt-dlp ffmpeg',
    'downloads.errorPrefix': 'このリンクをダウンロードできませんでした',
    'downloads.urlMissing': '先にリンクを貼り付けてください',
    'downloads.busy': '別のダウンロードが実行中です',
    'downloads.viewLibrary': '今すぐ再生',
    'downloads.newDownload': '新しいダウンロード',
    'downloads.serverHint': 'ファイルはこのMacに保存されます。',
    'downloads.audio': 'オーディオ',
    'downloads.phase.preparing': '準備中',
    'downloads.phase.downloading': '音声をダウンロード中',
    'downloads.phase.converting': '音声を変換中',
    'downloads.phase.tagging': 'アートワークを追加中',
    'downloads.phase.importing': 'ライブラリに追加中',
    'downloads.queue': 'ダウンロードキュー',
    'downloads.queueEmpty': 'リンクを追加するとここで待機します。',
    'downloads.queueAdded': 'キューに追加しました',
    'downloads.queueDuplicate': 'このリンクはすでにキューで待機しています',
    'downloads.queued': '待機中',
    'downloads.cancelledBody': '完了前にキャンセルされました。再試行できます。',
    'downloads.retry': '再試行',
    'downloads.retryAll': '失敗を再試行',
    'downloads.retryQueued': '再試行中…',
    'downloads.nothingToRetry': '再試行する項目はありません',
    'downloads.clearFinished': '完了を消去',
    'downloads.remove': '削除',
    'settings.eyebrow': '環境設定',
    'settings.title': '設定',
    'settings.subtitle': 'Riffを自分好みに。',
    'settings.language': '言語',
    'settings.languageBody': 'アラビア語と日本語のUIに対応し、右から左のレイアウトにも切り替わります。',
    'settings.auto': '自動',
    'settings.downloads': 'ダウンロード',
    'settings.downloadFolder': '保存先',
    'settings.format': '音声形式',
    'settings.quality': '品質',
    'settings.chooseFolder': '変更…',
    'settings.library': 'ライブラリ',
    'settings.libraryBody': '曲は元の場所を参照します。Riffがファイルを移動・削除することはありません。',
    'settings.openDownloads': 'ダウンロードフォルダを開く',
    'settings.openData': 'アプリデータを開く',
    'settings.about': 'Riffについて',
    'settings.aboutBody': 'Rustで作られたmacOS向けローカル音楽プレイヤー。音楽がMacの外に出ることはありません。',
    'settings.version': 'バージョン {version}',
    'settings.stats': '{tracks}曲 · {playlists}プレイリスト',
    'settings.shortcuts': 'キーボードショートカット',
    'settings.shortcutPlay': '再生 / 一時停止',
    'settings.shortcutSeek': '5秒シーク',
    'settings.shortcutVolume': '音量',
    'settings.shortcutSearch': 'ライブラリを検索',
    'settings.shortcutImport': '音楽を追加',
    'lang.auto': '自動',
    'lang.en': 'English',
    'lang.ar': 'العربية',
    'lang.ja': '日本語',
    'toast.imported': '{n}曲を追加しました',
    'toast.importedOne': '1曲を追加しました',
    'toast.importedSkipped': '{n}曲を追加 · {skipped}曲は追加済み',
    'toast.noAudio': '対応する音声ファイルがありません',
    'toast.importFailed': '一部のファイルを追加できませんでした',
    'toast.removed': 'ライブラリから削除しました',
    'toast.removedFromPlaylist': 'プレイリストから削除しました',
    'toast.duplicate': 'すでにライブラリにあります',
    'toast.addedToPlaylist': '「{name}」に追加しました',
    'toast.pasted': 'リンクを貼り付けました',
    'toast.pasteFailed': '⌘Vでフィールドに貼り付けてください',
    'toast.error': '問題が発生しました',
    'toast.trackMissing': 'このファイルは移動または削除されました',
    'toast.playError': 'このファイルを再生できませんでした',
    'toast.playlistCreated': 'プレイリストを作成しました',
    'toast.playlistRenamed': 'プレイリスト名を変更しました',
    'toast.playlistDeleted': 'プレイリストを削除しました',
    'confirm.removeTitle': 'ライブラリから削除しますか？',
    'confirm.removeBody': '曲はRiffから消えますが、ファイルはMacに残ります。',
    'confirm.removePlaylistBody': 'この曲はプレイリストから削除されます。ファイルは残ります。',
  },
};

const NATIVE_LANG = { en: 'English', ar: 'العربية', ja: '日本語' };

/* --------------------------------------------------------------- icons --- */

const ICONS = {
  play: '<svg viewBox="0 0 24 24"><path d="M8 5.3c0-.8.9-1.3 1.6-.9l9 6.2c.6.4.6 1.4 0 1.8l-9 6.2c-.7.4-1.6-.1-1.6-.9V5.3Z" fill="currentColor"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  more: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.7" fill="currentColor"/><circle cx="12" cy="12" r="1.7" fill="currentColor"/><circle cx="19" cy="12" r="1.7" fill="currentColor"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none"><path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.8"/><path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="none"><path d="M3.5 7.5a2 2 0 0 1 2-2h3.3l2 2h7.7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-10Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none"><path d="M10 13.5a4.2 4.2 0 0 0 6 0l2.2-2.2a4.24 4.24 0 0 0-6-6L11 6.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M14 10.5a4.2 4.2 0 0 0-6 0l-2.2 2.2a4.24 4.24 0 0 0 6 6l1.2-1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  music: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 18V5l11-2v13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6.5" cy="18" r="2.5" stroke="currentColor" stroke-width="1.7"/><circle cx="17.5" cy="16" r="2.5" stroke="currentColor" stroke-width="1.7"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none"><path d="M4.5 7h15M9.5 7V5.2A1.2 1.2 0 0 1 10.7 4h2.6a1.2 1.2 0 0 1 1.2 1.2V7M6.5 7l.8 12a1.6 1.6 0 0 0 1.6 1.5h6.2a1.6 1.6 0 0 0 1.6-1.5l.8-12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pencil: '<svg viewBox="0 0 24 24" fill="none"><path d="m4 20 4.2-1 10.6-10.6a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m13.8 7.4 3 3" stroke="currentColor" stroke-width="1.6"/></svg>',
  sort: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M7 12h10M10 17h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5 21 20H3l9-16.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5m0 0 6-6m-6 6 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="4.5" width="14" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M9 4.5V3.7c0-.6.5-1.2 1.2-1.2h3.6c.7 0 1.2.6 1.2 1.2v.8" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 11h7M8.5 15h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="m8 12.3 2.6 2.6L16.3 9" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none"><path d="M20 11a8 8 0 1 0-2.4 5.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M20 4.5V11h-6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

const icon = (name) => ICONS[name] || '';

/* --------------------------------------------------------------- utils --- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const esc = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[ch]));

function num(value) {
  try {
    return new Intl.NumberFormat(ui.lang === 'ar' ? 'ar-u-nu-latn' : ui.lang).format(value);
  } catch {
    return String(value);
  }
}

function t(key, vars = {}) {
  const table = I18N[ui.lang] || I18N.en;
  let text = table[key] ?? I18N.en[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, name) => (vars[name] !== undefined ? vars[name] : `{${name}}`));
}

function countText(n) {
  return t(n === 1 ? 'library.songCountOne' : 'library.songCount', { n: num(n) });
}

function formatTime(seconds) {
  const total = Number.isFinite(seconds) && seconds > 0 ? Math.floor(seconds) : 0;
  const hours = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hours > 0) {
    return `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function minutesText(seconds) {
  const mins = Math.max(0, Math.round((Number(seconds) || 0) / 60));
  return t('library.minutes', { n: num(mins) });
}

function hashString(value) {
  let hash = 2166136261;
  const text = String(value || '');
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function palette(seed) {
  const h1 = hashString(seed) % 360;
  const h2 = (h1 + 38 + (hashString(`${seed}-b`) % 46)) % 360;
  return [h1, h2];
}

function artStyle(seed) {
  const [a, b] = palette(seed);
  return `background: radial-gradient(120% 110% at 18% 0%, hsl(${a} 72% 50% / .92), transparent 58%), radial-gradient(120% 110% at 90% 100%, hsl(${b} 68% 42% / .55), transparent 55%), linear-gradient(145deg, hsl(${a} 42% 28%), hsl(${b} 46% 15%));`;
}

function initialOf(title) {
  return Array.from(String(title || '').trim())[0] || '♪';
}

function artHtml(track, extraClass = '') {
  const seed = track?.id || track?.title || 'riff';
  const letter = initialOf(track?.title);
  const cover = track?.hasCover
    ? `<img src="/api/cover/${encodeURIComponent(track.id)}" alt="" loading="lazy" onerror="this.remove()">`
    : '';
  return `<div class="art ${extraClass}" style="${artStyle(seed)}"><span class="art-letter" dir="auto">${esc(letter)}</span>${cover}<div class="art-gloss"></div></div>`;
}

function artistOf(track) {
  return track?.artist?.trim() ? track.artist : t('unknownArtist');
}

function normalizeText(value) {
  return String(value || '').normalize('NFKC').toLocaleLowerCase();
}

function shuffleList(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  if (!response.ok) {
    throw new Error(payload?.error || t('toast.error'));
  }
  return payload ?? {};
}

/* --------------------------------------------------------------- state --- */

const data = {
  rev: 0,
  tracks: [],
  playlists: [],
  settings: { language: 'auto', format: 'mp3', quality: 'best', downloadDir: '' },
  tools: {},
  paths: {},
  job: null,
  queue: [],
  notice: null,
  version: '',
};

const ui = {
  view: 'library',
  playlistId: null,
  search: '',
  sort: localStorage.getItem('riff.sort') || 'recent',
  lang: 'en',
  url: '',
  info: null,
  infoUrl: '',
  fetching: false,
  starting: false,
  importing: false,
  menuCloseHandler: null,
};

const audio = new Audio();
audio.preload = 'metadata';

const player = {
  queue: [],
  index: -1,
  shuffle: false,
  repeat: 'off',
  volume: 0.8,
  duration: 0,
  seeking: false,
  seekPreview: 0,
};

/* ------------------------------------------------------------- helpers --- */

function getTrack(id) {
  return data.tracks.find((track) => track.id === id) || null;
}

function getPlaylist(id) {
  return data.playlists.find((playlist) => playlist.id === id) || null;
}

function currentTrack() {
  const id = player.queue[player.index];
  return id ? getTrack(id) : null;
}

function getDuration() {
  if (Number.isFinite(audio.duration) && audio.duration > 0) return audio.duration;
  return player.duration || currentTrack()?.duration || 0;
}

function resolveLang() {
  const raw = data.settings?.language || 'auto';
  if (raw !== 'auto') return raw;
  const nav = (navigator.language || 'en').toLowerCase();
  if (nav.startsWith('ar')) return 'ar';
  if (nav.startsWith('ja')) return 'ja';
  return 'en';
}

function getVisibleTracks() {
  const query = normalizeText(ui.search);
  let tracks = data.tracks.filter((track) => {
    if (!query) return true;
    return normalizeText(`${track.title} ${track.artist} ${track.album}`).includes(query);
  });
  const collator = new Intl.Collator(ui.lang === 'ar' ? 'ar' : ui.lang, { sensitivity: 'base' });
  if (ui.sort === 'title') {
    tracks = tracks.sort((a, b) => collator.compare(a.title || '', b.title || ''));
  } else if (ui.sort === 'artist') {
    tracks = tracks.sort((a, b) =>
      collator.compare(a.artist || '', b.artist || '') || collator.compare(a.title || '', b.title || ''));
  } else if (ui.sort === 'duration') {
    tracks = tracks.sort((a, b) => (a.duration || 0) - (b.duration || 0));
  } else {
    tracks = tracks.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
  }
  return tracks;
}

function downloadedTracks() {
  return data.tracks
    .filter((track) => track.source === 'download')
    .sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
}

function contextIds(ctx) {
  if (!ctx || ctx === 'library') return getVisibleTracks().map((track) => track.id);
  if (ctx.startsWith('playlist:')) {
    const playlist = getPlaylist(ctx.slice('playlist:'.length));
    return playlist ? playlist.trackIds.filter((id) => !!getTrack(id)) : [];
  }
  if (ctx === 'downloaded') return downloadedTracks().map((track) => track.id);
  return [];
}

function isRunningJob(job) {
  return !!job && !['done', 'error', 'cancelled'].includes(job.status);
}

/* ------------------------------------------------------------- language --- */

function applyLanguage() {
  ui.lang = resolveLang();
  document.documentElement.lang = ui.lang;
  document.documentElement.dir = ui.lang === 'ar' ? 'rtl' : 'ltr';
  $$('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  const label = $('#language-label');
  if (label) label.textContent = NATIVE_LANG[ui.lang] || 'English';
  document.title = 'Riff';
}

/* -------------------------------------------------------------- render --- */

function render({ scrollTop = false, animate = false } = {}) {
  const active = document.activeElement;
  const focusId = active?.id || null;
  const selStart = active && typeof active.selectionStart === 'number' ? active.selectionStart : null;
  const selEnd = active && typeof active.selectionEnd === 'number' ? active.selectionEnd : null;

  applyLanguage();
  renderSidebar();
  renderView(animate);
  renderPlayer();

  if (scrollTop) {
    const main = $('#main');
    if (main) main.scrollTop = 0;
  }
  if (focusId) {
    const element = document.getElementById(focusId);
    if (element) {
      element.focus({ preventScroll: true });
      if (selStart !== null && typeof element.setSelectionRange === 'function') {
        try { element.setSelectionRange(selStart, selEnd); } catch { /* ignore */ }
      }
    }
  }
}

function renderSidebar() {
  $$('[data-nav]').forEach((button) => {
    const active = button.dataset.nav === 'playlist'
      ? false
      : button.dataset.nav === ui.view;
    button.classList.toggle('active', active);
  });

  const list = $('#playlist-list');
  if (!list) return;
  if (!data.playlists.length) {
    list.innerHTML = `<div class="playlist-empty">${esc(t('playlist.emptyBody'))}</div>`;
  } else {
    list.innerHTML = data.playlists.map((playlist) => {
      const [a, b] = palette(playlist.id);
      const active = ui.view === 'playlist' && ui.playlistId === playlist.id ? 'active' : '';
      return `
        <div class="playlist-item ${active}" data-open-playlist="${esc(playlist.id)}" role="button" tabindex="0">
          <span class="pl-tile" style="background:linear-gradient(140deg,hsl(${a} 60% 46%),hsl(${b} 55% 30%))">${esc(initialOf(playlist.name))}</span>
          <span class="pl-text">
            <span class="pl-name" dir="auto">${esc(playlist.name)}</span>
            <span class="pl-count">${esc(countText(playlist.trackIds.length))}</span>
          </span>
          <button class="pl-more" data-act="playlist-menu" data-id="${esc(playlist.id)}" title="${esc(t('action.more'))}" aria-label="${esc(t('action.more'))}">${icon('more')}</button>
        </div>`;
    }).join('');
  }

  const version = $('#sidebar-version');
  if (version) version.textContent = `Riff ${data.version || ''} · Rust`.trim();
}

function renderView(animate) {
  const view = $('#view');
  if (!view) return;
  let html = '';
  if (ui.view === 'downloads') html = downloadsView();
  else if (ui.view === 'settings') html = settingsView();
  else if (ui.view === 'playlist') html = playlistView(ui.playlistId);
  else html = libraryView();
  view.innerHTML = html;
  if (animate) {
    view.classList.remove('anim');
    void view.offsetWidth;
    view.classList.add('anim');
  }
}

/* ------------------------------------------------------------- library --- */

function importButton() {
  if (ui.importing) {
    return `<button class="primary-btn" disabled><span class="spinner"></span>${esc(t('import.busy'))}</button>`;
  }
  return `<button class="primary-btn" data-act="import-menu">${icon('plus')}${esc(t('action.import'))}</button>`;
}

function libraryView() {
  const hasTracks = data.tracks.length > 0;
  const recents = [...data.tracks].sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0)).slice(0, 10);
  const header = `
    <div class="view-head">
      <div class="view-heading">
        <div class="eyebrow">${esc(t('library.eyebrow'))}</div>
        <h1 class="view-title">${esc(t('library.title'))}</h1>
        <p class="view-sub">${esc(t('library.subtitle'))}</p>
      </div>
      <div class="view-actions">
        <div class="search-box">
          ${icon('search')}
          <input id="search-input" class="search-input" type="search" autocomplete="off" spellcheck="false"
            placeholder="${esc(t('search.placeholder'))}" value="${esc(ui.search)}" dir="auto">
        </div>
        <button class="ghost-btn" data-act="sort-menu">${icon('sort')}${esc(t(`sort.${ui.sort}`))}${icon('chevronDown')}</button>
        ${importButton()}
      </div>
    </div>`;

  if (!hasTracks) {
    return `${header}
      <div class="empty">
        <div class="empty-art"><div class="vinyl"></div></div>
        <h2 class="empty-title">${esc(t('library.emptyTitle'))}</h2>
        <p class="empty-body">${esc(t('library.emptyBody'))}</p>
        <div class="empty-actions">
          ${importButton()}
          <button class="ghost-btn" data-nav="downloads">${icon('link')}${esc(t('library.emptyDownload'))}</button>
        </div>
      </div>`;
  }

  const cardRail = recents.map((track) => {
    const playing = currentTrack()?.id === track.id;
    return `
      <div class="card ${playing ? 'playing' : ''}" data-id="${esc(track.id)}" role="button" tabindex="0">
        <div class="card-art">
          ${artHtml(track)}
          <div class="card-play">${icon(playing && !audio.paused ? 'pause' : 'play')}</div>
          ${playing ? '<div class="eq card-eq"><span></span><span></span><span></span></div>' : ''}
        </div>
        <div class="card-title" dir="auto">${esc(track.title)}</div>
        <div class="card-sub" dir="auto">${esc(artistOf(track))}</div>
      </div>`;
  }).join('');

  const recent = `<section class="recents">
      <div class="section-head">
        <h2>${esc(t('library.recent'))}</h2>
        <span class="section-meta">${esc(countText(recents.length))}</span>
      </div>
      <div class="card-rail">${cardRail}</div>
    </section>`;

  return `${header}
    ${ui.search ? '' : recent}
    <div id="results">${libraryResultsHtml()}</div>`;
}

function libraryResultsHtml() {
  const tracks = getVisibleTracks();
  if (!tracks.length) {
    return `<div class="section"><div class="tracklist"><div class="list-empty">${esc(t('library.noResults'))}</div></div></div>`;
  }
  return `<div class="section">
    <div class="section-head">
      <h2>${esc(t('library.songs'))}</h2>
      <span class="section-meta">${esc(countText(tracks.length))}</span>
    </div>
    ${trackListHtml(tracks, 'library')}
  </div>`;
}

function updateLibraryResults() {
  const results = $('#results');
  if (results) results.innerHTML = libraryResultsHtml();
  const recents = $('.recents');
  if (recents) recents.classList.toggle('hidden', !!ui.search);
}

function trackListHtml(tracks, ctx) {
  if (!tracks.length) {
    return `<div class="tracklist"><div class="list-empty">${esc(t('library.noResults'))}</div></div>`;
  }
  const playingId = currentTrack()?.id;
  const rows = tracks.map((track, index) => {
    const playing = playingId === track.id;
    const missing = track.available === false;
    return `<div class="track-row ${playing ? 'playing' : ''} ${missing ? 'missing' : ''}" data-id="${esc(track.id)}" data-ctx="${esc(ctx)}" role="button" tabindex="0">
      <div class="track-index">
        <span class="num">${num(index + 1)}</span>
        <button class="row-play" data-act="play-row" data-id="${esc(track.id)}" data-ctx="${esc(ctx)}" title="${esc(t('action.play'))}" aria-label="${esc(t('action.play'))}">${icon('play')}</button>
        <span class="eq"><span></span><span></span><span></span></span>
      </div>
      <div class="track-main">
        ${artHtml(track)}
        <div class="track-text">
          <div class="t-title" dir="auto">${esc(track.title)}</div>
          <div class="t-sub" dir="auto">${esc(artistOf(track))}</div>
        </div>
      </div>
      <div class="t-artist" dir="auto">${esc(artistOf(track))}</div>
      <div class="t-album" dir="auto">${esc(track.album || t('unknownAlbum'))}</div>
      <div class="t-time">${esc(formatTime(track.duration))}</div>
      <div class="track-tools">
        <button class="tool-btn" data-act="track-add" data-id="${esc(track.id)}" title="${esc(t('action.addToPlaylist'))}" aria-label="${esc(t('action.addToPlaylist'))}">${icon('plus')}</button>
        <button class="tool-btn" data-act="track-more" data-id="${esc(track.id)}" data-ctx="${esc(ctx)}" title="${esc(t('action.more'))}" aria-label="${esc(t('action.more'))}">${icon('more')}</button>
      </div>
    </div>`;
  }).join('');

  return `<div class="tracklist">
    <div class="track-head">
      <span>#</span>
      <span>${esc(t('table.title'))}</span>
      <span>${esc(t('table.artist'))}</span>
      <span class="th-album">${esc(t('table.album'))}</span>
      <span class="th-time">${esc(t('table.time'))}</span>
      <span class="th-tools"></span>
    </div>
    ${rows}
  </div>`;
}

/* ------------------------------------------------------------ playlist --- */

function playlistView(id) {
  const playlist = getPlaylist(id);
  if (!playlist) return libraryView();
  const tracks = playlist.trackIds.map((trackId) => getTrack(trackId)).filter(Boolean);
  const total = tracks.reduce((sum, track) => sum + (Number(track.duration) || 0), 0);
  const [a, b] = palette(playlist.id);
  const cells = [0, 1, 2, 3].map((index) => (
    tracks[index] ? artHtml(tracks[index]) : `<div class="empty-tile">${icon('music')}</div>`
  )).join('');
  const canPlay = tracks.some((track) => track.available !== false);
  const firstPlayable = tracks.find((track) => track.available !== false);

  return `
    <div class="playlist-top">
      <button class="ghost-btn" data-nav="library">${icon('back')}${esc(t('nav.library'))}</button>
    </div>
    <section class="playlist-hero" style="--ha:${a};--hb:${b}">
      <div class="playlist-art"><div class="mosaic">${cells}</div></div>
      <div class="playlist-info">
        <div class="eyebrow">${esc(t('playlist.eyebrow'))}</div>
        <h1 class="playlist-title" dir="auto">${esc(playlist.name)}</h1>
        <div class="playlist-meta">
          <span>${esc(countText(tracks.length))}</span>
          <span class="dot"></span>
          <span>${esc(minutesText(total))}</span>
        </div>
        <div class="hero-actions">
          <button class="primary-btn" data-act="playlist-play" data-id="${esc(playlist.id)}" ${canPlay ? '' : 'disabled'}>${icon('play')}${esc(t('action.playAll'))}</button>
          <button class="ghost-btn" data-act="playlist-shuffle" data-id="${esc(playlist.id)}" ${canPlay ? '' : 'disabled'}>${icon('play')}${esc(t('action.shufflePlay'))}</button>
          <button class="ghost-btn" data-act="add-songs" data-id="${esc(playlist.id)}">${icon('plus')}${esc(t('action.addSongs'))}</button>
          <button class="ghost-btn" data-act="playlist-menu" data-id="${esc(playlist.id)}" title="${esc(t('action.more'))}" aria-label="${esc(t('action.more'))}">${icon('more')}</button>
        </div>
      </div>
    </section>
    <div class="section">
      ${tracks.length
        ? `<div class="section-head"><h2>${esc(t('library.songs'))}</h2><span class="section-meta">${esc(countText(tracks.length))} · ${esc(minutesText(total))}</span></div>`
        : ''}
      <div id="results">${tracks.length
        ? trackListHtml(tracks, `playlist:${playlist.id}`)
        : `<div class="tracklist"><div class="list-empty" style="padding:38px 20px">
            <div style="font-size:14px;color:var(--text);font-weight:600;margin-bottom:5px">${esc(t('playlist.emptyTitle'))}</div>
            <div>${esc(t('playlist.emptyBody'))}</div>
            <div style="margin-top:14px"><button class="primary-btn" data-act="add-songs" data-id="${esc(playlist.id)}">${icon('plus')}${esc(t('action.addSongs'))}</button></div>
          </div></div>`}</div>
    </div>
    ${firstPlayable ? '' : ''}`;
}

/* ----------------------------------------------------------- downloads --- */

function toolsWarningHtml() {
  const missing = [];
  if (!data.tools?.ytdlp) missing.push('yt-dlp');
  if (!data.tools?.ffmpeg) missing.push('ffmpeg');
  if (!missing.length) return '';
  return `<div class="tools-warning">
    ${icon('alert')}
    <div>
      <div class="tw-title">${esc(t('downloads.toolsTitle'))}</div>
      <div class="tw-body">${esc(t('downloads.toolsBody'))}</div>
      <code>${esc(t('downloads.install'))}</code>
    </div>
  </div>`;
}

function downloadsView() {
  const running = isRunningJob(data.job);
  const showJob = !!data.job;
  const info = ui.info && ui.infoUrl === ui.url ? ui.info : null;
  const downloading = ui.starting;

  const preview = info
    ? `<div class="preview-card">
        <div class="preview-top">
          <div class="preview-art-wrap">${artHtml({ id: info.url || info.title, title: info.title, hasCover: false }, 'preview-art')}
            ${info.thumbnail ? `<img class="preview-thumb" src="${esc(info.thumbnail)}" alt="" referrerpolicy="no-referrer" onerror="this.remove()">` : ''}
          </div>
          <div class="preview-info">
            <div class="preview-kicker">${esc(t('downloads.preview'))}</div>
            <div class="preview-title" dir="auto">${esc(info.title)}</div>
            <div class="preview-artist" dir="auto">${esc(info.artist || t('unknownArtist'))}</div>
            <div class="chips">
              ${info.duration ? `<span class="chip">${esc(formatTime(info.duration))}</span>` : ''}
              ${info.extractor ? `<span class="chip">${esc(info.extractor)}</span>` : ''}
              <span class="chip">${esc(t('downloads.audio'))}</span>
            </div>
          </div>
        </div>
        <div class="preview-divider"></div>
        <div class="preview-note">${esc(t('downloads.serverHint'))}</div>
      </div>`
    : `<div class="preview-empty">
        <div class="pe-icon">${icon('link')}</div>
        <div class="pe-title">${esc(t('downloads.preview'))}</div>
        <div class="pe-body">${esc(t('downloads.hint'))}</div>
        <div class="service-chips"><span>YouTube</span><span>SoundCloud</span><span>Bandcamp</span><span>Vimeo</span></div>
      </div>`;

  return `
    <div class="view-head">
      <div class="view-heading">
        <div class="eyebrow">${esc(t('downloads.eyebrow'))}</div>
        <h1 class="view-title">${esc(t('downloads.title'))}</h1>
        <p class="view-sub">${esc(t('downloads.subtitle'))}</p>
      </div>
    </div>

    <div class="download-layout">
      <section class="panel link-panel">
        <label class="field-label" for="url-input">${esc(t('downloads.urlPlaceholder'))}</label>
        <div class="url-row">
          ${icon('link')}
          <input id="url-input" class="url-input ltr" type="url" autocomplete="off" spellcheck="false"
            placeholder="${esc(t('downloads.urlPlaceholder'))}" value="${esc(ui.url)}">
          <button class="paste-btn" data-act="paste">${icon('clipboard')}${esc(t('action.paste'))}</button>
        </div>

        <div class="option-row">
          <div class="option-group">
            <span class="field-label">${esc(t('downloads.format'))}</span>
            <div class="seg" role="group">
              <button class="seg-btn ${data.settings.format === 'mp3' ? 'active' : ''}" data-format="mp3" data-act="set-format">MP3</button>
              <button class="seg-btn ${data.settings.format === 'm4a' ? 'active' : ''}" data-format="m4a" data-act="set-format">M4A</button>
            </div>
          </div>
          <div class="option-group">
            <span class="field-label">${esc(t('downloads.quality'))}</span>
            <div class="seg" role="group">
              <button class="seg-btn ${data.settings.quality === 'best' ? 'active' : ''}" data-quality="best" data-act="set-quality">${esc(t('downloads.qualityBest'))}</button>
              <button class="seg-btn ${data.settings.quality === '320' ? 'active' : ''}" data-quality="320" data-act="set-quality">320</button>
              <button class="seg-btn ${data.settings.quality === '192' ? 'active' : ''}" data-quality="192" data-act="set-quality">192</button>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button class="ghost-btn" data-act="fetch-info" ${ui.fetching ? 'disabled' : ''}>
            ${ui.fetching ? '<span class="spinner"></span>' : icon('search')}
            ${esc(ui.fetching ? t('downloads.fetching') : t('action.fetch'))}
          </button>
          <button class="primary-btn" data-act="download-start" ${downloading ? 'disabled' : ''}>
            ${downloading ? '<span class="spinner"></span>' : icon('download')}
            ${esc(downloading ? t('downloads.starting') : queueHasWork() ? t('downloads.addToQueue') : t('downloads.start'))}
          </button>
        </div>
        <p class="hint">${esc(t('downloads.hint'))}</p>
        ${toolsWarningHtml()}
      </section>

      <section class="panel preview-panel">${preview}</section>
    </div>

    <div class="job-slot" id="job-slot">${showJob ? jobPanelHtml() : ''}</div>
    <div id="queue-slot">${queueSectionHtml()}</div>

    <div class="section">
      <div class="section-head">
        <h2>${esc(t('downloads.downloaded'))}</h2>
        <span class="section-meta">${esc(countText(downloadedTracks().length))}</span>
      </div>
      ${downloadedTracks().length
        ? trackListHtml(downloadedTracks(), 'downloaded')
        : `<div class="tracklist"><div class="list-empty">${esc(t('downloads.historyEmpty'))}</div></div>`}
    </div>
    ${running ? '' : ''}`;
}

function jobPanelHtml() {
  const job = data.job;
  if (!job) return '';
  const running = isRunningJob(job);
  const indeterminate = running && ['converting', 'tagging', 'importing'].includes(job.status);
  const pct = Math.max(0, Math.min(100, Number(job.progress) || 0));
  const title = job.title || (ui.info && ui.infoUrl === job.url ? ui.info.title : '') || t('downloads.unknownTitle');
  const artist = job.artist || (ui.info && ui.infoUrl === job.url ? ui.info.artist : '') || '';
  const phase = running ? t(`downloads.phase.${job.status}`) : t(
    job.status === 'done' ? 'downloads.done' : job.status === 'error' ? 'downloads.failed' : 'downloads.cancelled',
  );
  const phaseClass = job.status === 'done' ? 'done' : job.status === 'error' ? 'error' : job.status === 'cancelled' ? 'cancelled' : '';

  let art = `<div class="art job-art" style="${artStyle(job.url || title)}"><span class="art-letter">♪</span></div>`;
  if (job.thumbnail && job.thumbnail.startsWith('/api/')) {
    art = `<div class="art job-art" style="${artStyle(job.trackId || job.url)}"><img src="${esc(job.thumbnail)}" alt="" onerror="this.remove()"><div class="art-gloss"></div></div>`;
  } else if (job.thumbnail) {
    art = `<div class="art job-art" style="${artStyle(job.url)}"><img src="${esc(job.thumbnail)}" alt="" referrerpolicy="no-referrer" onerror="this.remove()"><div class="art-gloss"></div></div>`;
  }

  let right = `<div class="job-pct">${Math.round(pct)}<small>%</small></div>`;
  if (indeterminate) right = `<span class="spinner"></span>`;
  if (!running) {
    right = `<div class="job-pct">${job.status === 'done' ? icon('check') : job.status === 'error' ? icon('alert') : icon('close')}</div>`;
  }

  const meta = [];
  if (running && job.speed) meta.push(`<span>${esc(job.speed)}</span>`);
  if (running && job.eta) meta.push(`<span>ETA ${esc(job.eta)}</span>`);
  if (job.status === 'done') meta.push(`<span class="job-message">${esc(t('downloads.doneBody', { title }))}</span>`);
  if (job.status === 'error' && job.message) meta.push(`<span class="job-message">${esc(job.message)}</span>`);
  if (job.status === 'cancelled') meta.push(`<span class="job-message">${esc(t('downloads.cancelBody'))}</span>`);

  let actions = '';
  if (running) {
    actions = `<button class="ghost-btn" data-act="cancel-download">${icon('close')}${esc(t('downloads.cancelDownload'))}</button>`;
  } else if (job.status === 'error' || job.status === 'cancelled') {
    actions = `<button class="ghost-btn" data-act="retry-download">${icon('download')}${esc(t('action.retry'))}</button>`;
  } else if (job.status === 'done') {
    actions = `${job.trackId ? `<button class="primary-btn" data-act="play-id" data-id="${esc(job.trackId)}">${icon('play')}${esc(t('downloads.viewLibrary'))}</button>` : ''}
      ${job.trackId ? `<button class="ghost-btn" data-act="reveal-track" data-id="${esc(job.trackId)}">${icon('folder')}${esc(t('action.showInFinder'))}</button>` : ''}`;
  }

  return `<section class="panel job-panel">
    <div class="job-head">
      ${art}
      <div class="job-text">
        <div class="job-phase ${phaseClass}">${esc(phase)}</div>
        <div class="job-title" dir="auto">${esc(title)}</div>
        <div class="now-artist" dir="auto" style="margin-top:2px">${artist ? esc(t('downloads.by', { artist })) : ''}</div>
      </div>
      ${right}
    </div>
    <div class="progress ${indeterminate ? 'indeterminate' : ''}" style="--pct:${pct}%">
      <div class="progress-fill" style="width:${running && !indeterminate ? pct : 100}%"></div>
    </div>
    <div class="job-meta">
      ${meta.join('')}
      <div class="job-actions">${actions}</div>
    </div>
  </section>`;
}

function renderJobSlot() {
  const slot = $('#job-slot');
  if (!slot) return;
  slot.innerHTML = jobPanelHtml();
}

/* ---------------------------------------------------------- queue --- */

function queueLiveJob(item) {
  return data.job && data.job.id === item.id && isRunningJob(data.job) ? data.job : null;
}

function queueIsFinished(status) {
  return ['done', 'error', 'cancelled'].includes(status);
}

function queueIsActive(status) {
  return !queueIsFinished(status) && status !== 'queued';
}

function queuePhase(status) {
  if (status === 'queued') return t('downloads.queued');
  if (status === 'done') return t('downloads.done');
  if (status === 'error') return t('downloads.failed');
  if (status === 'cancelled') return t('downloads.cancelled');
  if (status === 'running') return t('downloads.phase.preparing');
  return t(`downloads.phase.${status}`);
}

function queueItemProgress(item) {
  const live = queueLiveJob(item);
  if (live) return Math.max(0, Math.min(100, Number(live.progress) || 0));
  if (item.status === 'done') return 100;
  return Math.max(0, Math.min(100, Number(item.progress) || 0));
}

function queueItemSubtitle(item, status) {
  const parts = [];
  parts.push(queuePhase(status));
  if (status === 'queued' || queueIsActive(status)) {
    parts.push(`${Math.round(queueItemProgress(item))}%`);
  }
  if (item.format) parts.push(String(item.format).toUpperCase());
  return parts.filter(Boolean).join(' · ');
}

function queueItemActions(item, status) {
  const buttons = [];
  if (queueIsActive(status)) {
    buttons.push(`<button class="ghost-btn small" data-act="queue-cancel" data-id="${esc(item.id)}">${icon('close')}${esc(t('action.cancel'))}</button>`);
  } else if (status === 'error' || status === 'cancelled') {
    buttons.push(`<button class="ghost-btn small" data-act="queue-retry" data-id="${esc(item.id)}">${icon('refresh')}${esc(t('downloads.retry'))}</button>`);
  } else if (status === 'done' && item.trackId) {
    buttons.push(`<button class="ghost-btn small" data-act="play-id" data-id="${esc(item.trackId)}">${icon('play')}${esc(t('downloads.viewLibrary'))}</button>`);
  }
  if (!queueIsActive(status)) {
    buttons.push(`<button class="icon-btn small" data-act="queue-remove" data-id="${esc(item.id)}" title="${esc(t('downloads.remove'))}" aria-label="${esc(t('downloads.remove'))}">${icon('trash')}</button>`);
  }
  return buttons.join('');
}

function queueItemHtml(item) {
  const live = queueLiveJob(item);
  const status = live ? live.status : item.status;
  const progress = queueItemProgress(item);
  const title = item.title || item.artist || item.url || t('downloads.unknownTitle');
  const tone = status === 'done' ? 'done' : status === 'error' ? 'error' : status === 'cancelled' ? 'cancelled' : queueIsActive(status) ? 'running' : 'queued';
  const showBar = status === 'queued' || queueIsActive(status);
  const thumb = item.thumbnail && item.thumbnail.startsWith('/api/')
    ? `<img src="${esc(item.thumbnail)}" alt="" onerror="this.remove()">`
    : `<span class="queue-initial">${esc(initialOf(title))}</span>`;
  return `<div class="queue-item ${tone}" data-queue-id="${esc(item.id)}">
    <div class="queue-art">${thumb}</div>
    <div class="queue-text">
      <div class="queue-title" dir="auto">${esc(title)}</div>
      <div class="queue-sub" dir="auto">${esc(queueItemSubtitle(item, status))}</div>
      ${showBar ? `<div class="queue-bar"><span style="width:${progress}%"></span></div>` : ''}
      ${status === 'error' && item.message ? `<div class="queue-error" dir="auto">${esc(item.message)}</div>` : ''}
      ${status === 'cancelled' && item.attempts > 0 ? `<div class="queue-error" dir="auto">${esc(t('downloads.cancelledBody'))}</div>` : ''}
    </div>
    <div class="queue-actions">${queueItemActions(item, status)}</div>
  </div>`;
}

function queueSectionHtml() {
  const items = data.queue || [];
  const active = items.filter((item) => !queueIsFinished(item.status)).length;
  const failed = items.filter((item) => item.status === 'error' || item.status === 'cancelled').length;
  const finished = items.filter((item) => queueIsFinished(item.status)).length;
  const head = `<div class="section-head queue-head">
    <h2>${esc(t('downloads.queue'))}${active ? ` <span class="queue-count">${active}</span>` : ''}</h2>
    <div class="queue-head-actions">
      ${failed ? `<button class="ghost-btn small" data-act="retry-all">${icon('refresh')}${esc(t('downloads.retryAll'))}</button>` : ''}
      ${finished ? `<button class="ghost-btn small" data-act="clear-finished">${esc(t('downloads.clearFinished'))}</button>` : ''}
    </div>
  </div>`;
  const body = items.length
    ? `<div class="queue-list">${items.map(queueItemHtml).join('')}</div>`
    : `<div class="queue-empty">${icon('download')}<span>${esc(t('downloads.queueEmpty'))}</span></div>`;
  return `<section class="section queue-section">${head}${body}</section>`;
}

function renderQueueSlot() {
  const slot = $('#queue-slot');
  if (!slot) return;
  slot.innerHTML = queueSectionHtml();
}

/* ------------------------------------------------------------ settings --- */

function settingsView() {
  const rawLang = data.settings.language || 'auto';
  const languages = [
    ['auto', t('settings.auto'), 'AUTO'],
    ['en', 'English', 'EN'],
    ['ar', 'العربية', 'AR'],
    ['ja', '日本語', 'JA'],
  ];
  const langTiles = languages.map(([code, name, tag]) => `
    <button class="lang-tile ${rawLang === code ? 'active' : ''}" data-act="set-language" data-lang="${code}">
      <span class="lang-native">${esc(name)}${rawLang === code ? icon('check') : ''}</span>
      <span class="lang-code">${esc(tag)}</span>
    </button>`).join('');

  const counts = data.tracks.length;
  const playlists = data.playlists.length;

  return `
    <div class="view-head">
      <div class="view-heading">
        <div class="eyebrow">${esc(t('settings.eyebrow'))}</div>
        <h1 class="view-title">${esc(t('settings.title'))}</h1>
        <p class="view-sub">${esc(t('settings.subtitle'))}</p>
      </div>
    </div>

    <div class="settings-grid">
      <section class="settings-card wide">
        <div class="sc-head">${icon('link')}<h3>${esc(t('settings.language'))}</h3></div>
        <p class="sc-body">${esc(t('settings.languageBody'))}</p>
        <div class="lang-grid">${langTiles}</div>
      </section>

      <section class="settings-card">
        <div class="sc-head">${icon('download')}<h3>${esc(t('settings.downloads'))}</h3></div>
        <p class="sc-body">${esc(t('downloads.hint'))}</p>
        <div class="settings-row">
          <span class="sr-label">${esc(t('settings.downloadFolder'))}</span>
          <div class="folder-row">
            <span class="folder-path" title="${esc(data.settings.downloadDir)}">${esc(data.settings.downloadDir)}</span>
            <button class="ghost-btn" data-act="choose-folder">${esc(t('settings.chooseFolder'))}</button>
          </div>
        </div>
        <div class="settings-row">
          <span class="sr-label">${esc(t('settings.format'))}</span>
          <div class="seg" style="flex:1;max-width:190px">
            <button class="seg-btn ${data.settings.format === 'mp3' ? 'active' : ''}" data-format="mp3" data-act="set-format">MP3</button>
            <button class="seg-btn ${data.settings.format === 'm4a' ? 'active' : ''}" data-format="m4a" data-act="set-format">M4A</button>
          </div>
        </div>
        <div class="settings-row">
          <span class="sr-label">${esc(t('settings.quality'))}</span>
          <div class="seg" style="flex:1;max-width:260px">
            <button class="seg-btn ${data.settings.quality === 'best' ? 'active' : ''}" data-quality="best" data-act="set-quality">${esc(t('downloads.qualityBest'))}</button>
            <button class="seg-btn ${data.settings.quality === '320' ? 'active' : ''}" data-quality="320" data-act="set-quality">320</button>
            <button class="seg-btn ${data.settings.quality === '192' ? 'active' : ''}" data-quality="192" data-act="set-quality">192</button>
          </div>
        </div>
        <div class="settings-actions">
          <button class="ghost-btn" data-act="open-downloads">${icon('folder')}${esc(t('settings.openDownloads'))}</button>
        </div>
      </section>

      <section class="settings-card">
        <div class="sc-head">${icon('music')}<h3>${esc(t('settings.library'))}</h3></div>
        <p class="sc-body">${esc(t('settings.libraryBody'))}</p>
        <div class="stats-row">
          <div class="stat"><div class="stat-value">${num(counts)}</div><div class="stat-label">${esc(t('library.songs'))}</div></div>
          <div class="stat"><div class="stat-value">${num(playlists)}</div><div class="stat-label">${esc(t('nav.playlists'))}</div></div>
        </div>
        <div class="settings-actions">
          <button class="ghost-btn" data-act="open-downloads">${icon('folder')}${esc(t('settings.openDownloads'))}</button>
          <button class="ghost-btn" data-act="open-data">${icon('folder')}${esc(t('settings.openData'))}</button>
        </div>
      </section>

      <section class="settings-card">
        <div class="sc-head">${icon('music')}<h3>${esc(t('settings.shortcuts'))}</h3></div>
        <div class="shortcuts" style="margin-top:12px">
          <div class="shortcut"><span>${esc(t('settings.shortcutPlay'))}</span><span class="kbd">Space</span></div>
          <div class="shortcut"><span>${esc(t('settings.shortcutSeek'))}</span><span class="kbd">← / →</span></div>
          <div class="shortcut"><span>${esc(t('settings.shortcutVolume'))}</span><span class="kbd">↑ / ↓</span></div>
          <div class="shortcut"><span>${esc(t('settings.shortcutSearch'))}</span><span class="kbd">⌘F</span></div>
          <div class="shortcut"><span>${esc(t('settings.shortcutImport'))}</span><span class="kbd">⌘I</span></div>
        </div>
      </section>

      <section class="settings-card">
        <div class="about-row">
          <div class="about-mark" aria-hidden="true"><span></span><span></span><span></span></div>
          <div>
            <div class="about-name">Riff</div>
            <div class="about-version">${esc(t('settings.version', { version: data.version || '1.0.0' }))} · Rust</div>
          </div>
        </div>
        <p class="about-body">${esc(t('settings.aboutBody'))}</p>
        <div class="settings-actions">
          <span class="chip">${esc(t('settings.stats', { tracks: num(counts), playlists: num(playlists) }))}</span>
        </div>
      </section>
    </div>`;
}

/* -------------------------------------------------------------- player --- */

function renderPlayer() {
  const track = currentTrack();
  const playerEl = $('#player');
  if (!playerEl) return;

  if (track) {
    $('#now-title').textContent = track.title || '';
    $('#now-artist').textContent = artistOf(track);
    $('#now-initial').textContent = initialOf(track.title);
    $('#now-art').style.cssText = artStyle(track.id);
    const image = $('#now-cover-img');
    if (track.hasCover) {
      image.src = `/api/cover/${encodeURIComponent(track.id)}`;
      image.hidden = false;
    } else {
      image.hidden = true;
      image.removeAttribute('src');
    }
    player.duration = Number(track.duration) || 0;
  } else {
    $('#now-title').textContent = t('player.notPlaying');
    $('#now-artist').textContent = t('player.selectSong');
    $('#now-initial').textContent = '♪';
    $('#now-art').style.cssText = '';
    $('#now-cover-img').hidden = true;
    $('#now-cover-img').removeAttribute('src');
    player.duration = 0;
  }

  const isPlaying = !audio.paused && !!track;
  playerEl.classList.toggle('playing', isPlaying);
  $('#btn-play').title = isPlaying ? t('action.pause') : t('action.play');
  $('#btn-play').setAttribute('aria-label', isPlaying ? t('action.pause') : t('action.play'));
  $('#btn-shuffle').classList.toggle('active', player.shuffle);
  $('#btn-shuffle').title = t('action.shuffle');
  $('#btn-repeat').classList.toggle('active', player.repeat !== 'off');
  $('#btn-repeat').classList.toggle('one', player.repeat === 'one');
  $('#btn-repeat').title = t('action.repeat');
  $('#btn-mute').title = audio.muted ? t('action.unmute') : t('action.mute');
  $('#volume').value = String(Math.round(player.volume * 100));
  $('#volume').style.setProperty('--vol', `${Math.round(player.volume * 100)}%`);
  playerEl.classList.toggle('muted', audio.muted || player.volume === 0);
  updateProgress();
}

function updateProgress() {
  const seek = $('#seek');
  if (!seek) return;
  const duration = getDuration();
  const current = player.seeking ? player.seekPreview : (audio.currentTime || 0);
  const pct = duration > 0 ? Math.min(100, Math.max(0, (current / duration) * 100)) : 0;
  seek.value = String(Math.round(pct * 10));
  seek.style.setProperty('--seek', `${pct}%`);
  $('#time-current').textContent = formatTime(current);
  $('#time-total').textContent = formatTime(duration);
}

function updatePlayState() {
  const track = currentTrack();
  const isPlaying = !audio.paused && !!track;
  $('#player').classList.toggle('playing', isPlaying);
  $('#btn-play').title = isPlaying ? t('action.pause') : t('action.play');
  $('#btn-play').setAttribute('aria-label', isPlaying ? t('action.pause') : t('action.play'));
  const cards = $$('.card');
  cards.forEach((card) => {
    const playing = card.dataset.id === track?.id;
    card.classList.toggle('playing', playing);
    const playIcon = card.querySelector('.card-play');
    if (playIcon) playIcon.innerHTML = icon(playing && isPlaying ? 'pause' : 'play');
  });
}

function loadCurrent(autoplay) {
  const track = currentTrack();
  if (!track) return;
  if (track.available === false) {
    toast(t('toast.trackMissing'), 'error');
    nextTrack(false);
    return;
  }
  player.duration = Number(track.duration) || 0;
  audio.src = `/api/stream/${encodeURIComponent(track.id)}`;
  player.seeking = false;
  player.seekPreview = 0;
  renderPlayer();
  if (autoplay) {
    audio.play().catch(() => {
      toast(t('toast.playError'), 'error');
    });
  }
}

function playContext(ctx, startId) {
  const ids = contextIds(ctx);
  const playable = ids.filter((id) => getTrack(id)?.available !== false);
  if (!playable.length) {
    toast(t('toast.trackMissing'), 'error');
    return;
  }
  const start = playable.includes(startId) ? startId : playable[0];
  player.queue = playable;
  player.index = playable.indexOf(start);
  loadCurrent(true);
}

function playIds(ids) {
  const playable = ids.filter((id) => getTrack(id)?.available !== false);
  if (!playable.length) return;
  player.queue = playable;
  player.index = 0;
  loadCurrent(true);
}

function togglePlay() {
  if (!player.queue.length) {
    const tracks = getVisibleTracks();
    if (tracks.length) playContext('library', tracks[0].id);
    return;
  }
  if (audio.paused) {
    audio.play().catch(() => toast(t('toast.playError'), 'error'));
  } else {
    audio.pause();
  }
}

function nextTrack(fromEnded = false) {
  if (!player.queue.length) return;
  if (fromEnded && player.repeat === 'one') {
    audio.currentTime = 0;
    audio.play().catch(() => {});
    return;
  }
  let next = player.index + 1;
  if (next >= player.queue.length) {
    if (player.repeat === 'all') next = 0;
    else {
      audio.pause();
      return;
    }
  }
  player.index = next;
  loadCurrent(true);
}

function previousTrack() {
  if (!player.queue.length) return;
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    updateProgress();
    return;
  }
  let prev = player.index - 1;
  if (prev < 0) prev = player.repeat === 'all' ? player.queue.length - 1 : 0;
  player.index = prev;
  loadCurrent(true);
}

function toggleShuffle() {
  player.shuffle = !player.shuffle;
  if (player.shuffle && player.queue.length) {
    const current = player.queue[player.index];
    const rest = shuffleList(player.queue.filter((id) => id !== current));
    player.queue = current ? [current, ...rest] : rest;
    player.index = current ? 0 : -1;
  }
  renderPlayer();
}

function cycleRepeat() {
  player.repeat = player.repeat === 'off' ? 'all' : player.repeat === 'all' ? 'one' : 'off';
  renderPlayer();
}

function seekBy(delta) {
  const duration = getDuration();
  if (!duration) return;
  audio.currentTime = Math.min(duration, Math.max(0, audio.currentTime + delta));
  updateProgress();
}

function setVolume(value) {
  const volume = Math.min(1, Math.max(0, value));
  player.volume = volume;
  audio.volume = volume;
  if (volume > 0 && audio.muted) audio.muted = false;
  localStorage.setItem('riff.volume', String(volume));
  renderPlayer();
}

function toggleMute() {
  audio.muted = !audio.muted;
  renderPlayer();
}

/* ------------------------------------------------------------ playback --- */

function dropTrackFromPlayer(id) {
  if (currentTrack()?.id === id) {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    player.queue = [];
    player.index = -1;
    player.duration = 0;
    renderPlayer();
    return;
  }
  const index = player.queue.indexOf(id);
  if (index >= 0) {
    player.queue.splice(index, 1);
    if (index < player.index) player.index -= 1;
  }
}

audio.addEventListener('play', updatePlayState);
audio.addEventListener('pause', updatePlayState);
audio.addEventListener('ended', () => nextTrack(true));
audio.addEventListener('error', () => {
  if (audio.currentSrc && currentTrack()) {
    toast(t('toast.playError'), 'error');
  }
});
audio.addEventListener('loadedmetadata', () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    player.duration = audio.duration;
    updateProgress();
  }
});
audio.addEventListener('timeupdate', () => {
  if (!player.seeking) updateProgress();
});

/* ----------------------------------------------------------- mutations --- */

async function refreshState() {
  const state = await api('/api/state');
  data.rev = state.rev;
  data.tracks = state.tracks || [];
  data.playlists = state.playlists || [];
  data.settings = state.settings || data.settings;
  data.tools = state.tools || {};
  data.paths = state.paths || {};
  data.version = state.version || data.version;
  data.job = state.job || null;
  data.queue = state.queue || [];
  if (data.job && !ui.url) ui.url = data.job.url || '';
  ui.lang = resolveLang();
  if (state.notice) handleNotice(state.notice);
  return state;
}

function handleNotice(notice) {
  if (!notice) return;
  if (notice.kind === 'import') {
    if (notice.count > 0) showImportToast(notice.count, notice.skipped);
    else if (notice.skipped > 0) toast(t('toast.duplicate'), 'info');
  }
  data.notice = null;
  api('/api/notice/clear', { method: 'POST', body: '{}' }).catch(() => {});
}

function showImportToast(added, skipped) {
  if (!added) {
    toast(skipped ? t('toast.duplicate') : t('toast.noAudio'), skipped ? 'info' : 'error');
    return;
  }
  const message = skipped
    ? t('toast.importedSkipped', { n: num(added), skipped: num(skipped) })
    : added === 1
      ? t('toast.importedOne')
      : t('toast.imported', { n: num(added) });
  toast(message, 'success');
}

async function importMusic(mode) {
  if (ui.importing) return;
  ui.importing = true;
  renderView();
  try {
    const result = await api('/api/import', {
      method: 'POST',
      body: JSON.stringify({ mode, lang: ui.lang }),
    });
    if (!result.cancelled) {
      if (result.found === 0) toast(t('toast.noAudio'), 'error');
      else showImportToast(result.added, result.skipped);
      if (result.failed > 0) toast(t('toast.importFailed'), 'error');
    }
    await refreshState();
  } catch (error) {
    toast(error.message, 'error');
  } finally {
    ui.importing = false;
    render();
  }
}

async function createPlaylist(name, onCreated) {
  const result = await api('/api/playlists/create', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  await refreshState();
  render();
  toast(t('toast.playlistCreated'), 'success');
  if (onCreated) await onCreated(result.playlist);
}

async function removeTrackConfirmed(id) {
  try {
    await api('/api/track/remove', { method: 'POST', body: JSON.stringify({ id }) });
    dropTrackFromPlayer(id);
    await refreshState();
    render();
    toast(t('toast.removed'), 'success');
  } catch (error) {
    toast(error.message, 'error');
  }
}

async function removeFromPlaylist(playlistId, trackId) {
  try {
    await api('/api/playlists/remove', {
      method: 'POST',
      body: JSON.stringify({ playlistId, trackId }),
    });
    await refreshState();
    render();
    toast(t('toast.removedFromPlaylist'), 'info');
  } catch (error) {
    toast(error.message, 'error');
  }
}

async function deletePlaylist(id) {
  try {
    await api('/api/playlists/delete', { method: 'POST', body: JSON.stringify({ id }) });
    if (ui.view === 'playlist' && ui.playlistId === id) {
      ui.view = 'library';
      ui.playlistId = null;
    }
    await refreshState();
    render({ scrollTop: true, animate: true });
    toast(t('toast.playlistDeleted'), 'success');
  } catch (error) {
    toast(error.message, 'error');
  }
}

async function saveSettings(patch) {
  Object.assign(data.settings, patch);
  try {
    await api('/api/settings', { method: 'POST', body: JSON.stringify(patch) });
  } catch (error) {
    toast(error.message, 'error');
    await refreshState();
    render();
  }
}

async function setLanguage(lang) {
  const previous = data.settings.language;
  data.settings.language = lang;
  ui.lang = resolveLang();
  applyLanguage();
  render();
  try {
    await api('/api/settings', { method: 'POST', body: JSON.stringify({ language: lang }) });
  } catch (error) {
    data.settings.language = previous;
    ui.lang = resolveLang();
    applyLanguage();
    render();
    toast(error.message, 'error');
  }
}

function setFormat(format) {
  if (!['mp3', 'm4a'].includes(format)) return;
  data.settings.format = format;
  $$('[data-format]').forEach((button) => {
    button.classList.toggle('active', button.dataset.format === format);
  });
  api('/api/settings', { method: 'POST', body: JSON.stringify({ format }) }).catch((error) => {
    toast(error.message, 'error');
  });
}

function setQuality(quality) {
  if (!['best', '320', '192'].includes(quality)) return;
  data.settings.quality = quality;
  $$('[data-quality]').forEach((button) => {
    button.classList.toggle('active', button.dataset.quality === quality);
  });
  api('/api/settings', { method: 'POST', body: JSON.stringify({ quality }) }).catch((error) => {
    toast(error.message, 'error');
  });
}

async function chooseDownloadFolder() {
  try {
    const result = await api('/api/choose-download-dir', {
      method: 'POST',
      body: JSON.stringify({ lang: ui.lang }),
    });
    if (result.downloadDir && result.downloadDir !== data.settings.downloadDir) {
      data.settings.downloadDir = result.downloadDir;
      render();
    }
  } catch (error) {
    toast(error.message, 'error');
  }
}

/* --------------------------------------------------------------- link --- */

async function fetchLinkInfo() {
  const input = $('#url-input');
  const url = (input?.value || ui.url || '').trim();
  if (!url) {
    toast(t('downloads.urlMissing'), 'error');
    input?.focus();
    return;
  }
  ui.url = url;
  ui.fetching = true;
  renderView();
  try {
    const result = await api('/api/download/info', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    ui.info = result.info;
    ui.infoUrl = url;
  } catch (error) {
    ui.info = null;
    ui.infoUrl = '';
    toast(`${t('downloads.errorPrefix')} — ${error.message}`, 'error');
  } finally {
    ui.fetching = false;
    renderView();
    const field = $('#url-input');
    if (field) {
      field.value = ui.url;
      field.focus();
    }
  }
}

async function startDownload() {
  const input = $('#url-input');
  const url = (input?.value || ui.url || '').trim();
  if (!url) {
    toast(t('downloads.urlMissing'), 'error');
    input?.focus();
    return;
  }
  if (ui.starting) return;
  ui.url = url;
  ui.starting = true;
  renderView();
  try {
    const info = ui.info && ui.infoUrl === url ? ui.info : null;
    const result = await api('/api/download/start', {
      method: 'POST',
      body: JSON.stringify({
        url,
        format: data.settings.format,
        quality: data.settings.quality,
        title: info?.title || '',
        artist: info?.artist || '',
      }),
    });
    if (result.queue) data.queue = result.queue;
    if (result.job) data.job = result.job;
    ui.url = '';
    ui.info = null;
    ui.infoUrl = '';
    ui.starting = false;
    renderView();
    toast(t('downloads.queueAdded'), 'success');
    pollJob();
  } catch (error) {
    ui.starting = false;
    if (String(error.message).includes('already waiting')) {
      toast(t('downloads.queueDuplicate'), 'info');
    } else {
      toast(`${t('downloads.errorPrefix')} — ${error.message}`, 'error');
    }
    renderView();
  } finally {
    const field = $('#url-input');
    if (field) {
      field.value = ui.url;
      field.focus();
    }
  }
}

async function cancelDownload() {
  try {
    await api('/api/download/cancel', { method: 'POST', body: '{}' });
    await refreshState();
    if (ui.view === 'downloads') render();
  } catch (error) {
    toast(error.message, 'error');
  }
}

async function cancelQueueItem(id) {
  try {
    const result = await api('/api/download/cancel', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
    if (result.queue) data.queue = result.queue;
    await refreshState();
    if (ui.view === 'downloads') render();
  } catch (error) {
    toast(error.message, 'error');
  }
}

async function retryDownload(id) {
  try {
    const result = await api('/api/download/retry', {
      method: 'POST',
      body: JSON.stringify(id ? { id } : {}),
    });
    if (result.queue) data.queue = result.queue;
    if (id && data.job?.id === id) data.job = null;
    await refreshState();
    if (ui.view === 'downloads') render();
    if (result.retried) {
      toast(t('downloads.retryQueued'), 'info');
      pollJob();
    } else {
      toast(t('downloads.nothingToRetry'), 'info');
    }
  } catch (error) {
    toast(error.message, 'error');
  }
}

async function retryAllDownloads() {
  await retryDownload(null);
}

async function removeQueueItem(id) {
  try {
    const result = await api('/api/download/remove', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
    if (result.queue) data.queue = result.queue;
    await refreshState();
    if (ui.view === 'downloads') render();
  } catch (error) {
    toast(error.message, 'error');
  }
}

async function clearFinishedDownloads() {
  try {
    const result = await api('/api/download/clear', { method: 'POST', body: '{}' });
    if (result.queue) data.queue = result.queue;
    await refreshState();
    if (ui.view === 'downloads') render();
  } catch (error) {
    toast(error.message, 'error');
  }
}

async function pasteLink() {
  const input = $('#url-input');
  try {
    const text = (await navigator.clipboard.readText()).trim();
    if (!text) return;
    ui.url = text;
    if (input) input.value = text;
    toast(t('toast.pasted'), 'success');
    await fetchLinkInfo();
  } catch {
    toast(t('toast.pasteFailed'), 'error');
    input?.focus();
  }
}

function queueHasWork() {
  return isRunningJob(data.job)
    || (data.queue || []).some((item) => !queueIsFinished(item.status));
}

async function pollJob() {
  if (!queueHasWork()) return;
  try {
    const result = await api('/api/download/status');
    if (!result.job && !result.queue) return;
    const before = new Map((data.queue || []).map((item) => [item.id, item.status]));
    if (result.job) data.job = result.job;
    if (result.queue) data.queue = result.queue;
    if (ui.view === 'downloads') {
      renderJobSlot();
      renderQueueSlot();
    }
    const completed = (result.queue || []).filter(
      (item) => item.status === 'done' && before.get(item.id) !== 'done',
    );
    const failed = (result.queue || []).filter(
      (item) => item.status === 'error' && before.get(item.id) !== 'error',
    );
    if (completed.length || failed.length) {
      await refreshState();
      render();
      if (completed.length) toast(t('downloads.done'), 'success');
      if (failed.length) toast(t('downloads.failed'), 'error');
    }
  } catch {
    /* transient */
  }
}

/* ---------------------------------------------------------------- views --- */

function navigate(view) {
  ui.view = view;
  ui.playlistId = null;
  ui.search = '';
  render({ scrollTop: true, animate: true });
}

function openPlaylist(id) {
  ui.view = 'playlist';
  ui.playlistId = id;
  ui.search = '';
  render({ scrollTop: true, animate: true });
}

function playId(id) {
  const track = getTrack(id);
  if (!track) return;
  ui.view = 'library';
  ui.playlistId = null;
  ui.search = '';
  render({ scrollTop: true, animate: true });
  playContext('library', id);
}

function playPlaylist(id, shuffle = false) {
  const playlist = getPlaylist(id);
  if (!playlist) return;
  const ids = playlist.trackIds.filter((trackId) => getTrack(trackId)?.available !== false);
  if (!ids.length) {
    toast(t('toast.trackMissing'), 'error');
    return;
  }
  const ordered = shuffle ? shuffleList(ids) : ids;
  player.queue = ordered;
  player.index = 0;
  loadCurrent(true);
}

/* --------------------------------------------------------------- modal --- */

function openModal({ title, body, footer = '', wide = false, onReady }) {
  const root = $('#modal-root');
  root.innerHTML = `<div class="overlay">
    <div class="modal ${wide ? 'wide' : ''}" role="dialog" aria-modal="true">
      <div class="modal-head">
        <h3>${esc(title)}</h3>
        <button class="icon-btn" data-close title="${esc(t('action.close'))}" aria-label="${esc(t('action.close'))}">${icon('close')}</button>
      </div>
      <div class="modal-body">${body}</div>
      ${footer ? `<div class="modal-actions">${footer}</div>` : ''}
    </div>
  </div>`;
  const overlay = $('.overlay', root);
  overlay.addEventListener('mousedown', (event) => {
    if (event.target === overlay) closeModal();
  });
  $$('[data-close]', root).forEach((button) => {
    button.addEventListener('click', closeModal);
  });
  if (onReady) onReady(root);
}

function closeModal() {
  const root = $('#modal-root');
  if (root) root.innerHTML = '';
}

function openPrompt({ title, body, placeholder = '', value = '', confirmLabel, onConfirm }) {
  openModal({
    title,
    body: `${body ? `<p>${body}</p>` : ''}
      <input id="prompt-input" class="prompt-input" dir="auto" placeholder="${esc(placeholder)}" value="${esc(value)}">`,
    footer: `<button class="ghost-btn" data-close>${esc(t('action.cancel'))}</button>
      <button class="primary-btn" id="prompt-confirm">${esc(confirmLabel || t('action.save'))}</button>`,
    onReady: (root) => {
      const input = $('#prompt-input', root);
      const submit = async () => {
        const name = input.value.trim();
        if (!name) {
          input.focus();
          return;
        }
        closeModal();
        try {
          await onConfirm(name);
        } catch (error) {
          toast(error.message, 'error');
        }
      };
      input.focus();
      input.select();
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          submit();
        }
      });
      $('#prompt-confirm', root).addEventListener('click', submit);
    },
  });
}

function openConfirm({ title, body, confirmLabel, danger = false, onConfirm }) {
  openModal({
    title,
    body: `<p>${body}</p>`,
    footer: `<button class="ghost-btn" data-close>${esc(t('action.cancel'))}</button>
      <button class="${danger ? 'danger-btn' : 'primary-btn'}" id="modal-confirm">${esc(confirmLabel || t('action.confirm'))}</button>`,
    onReady: (root) => {
      $('#modal-confirm', root).addEventListener('click', async () => {
        closeModal();
        try {
          await onConfirm();
        } catch (error) {
          toast(error.message, 'error');
        }
      });
    },
  });
}

function openAddToPlaylist(trackIds) {
  const choices = data.playlists.map((playlist) => {
    const [a, b] = palette(playlist.id);
    return `<button class="playlist-choice" data-pick-playlist="${esc(playlist.id)}">
      <span class="pl-tile" style="background:linear-gradient(140deg,hsl(${a} 60% 46%),hsl(${b} 55% 30%))">${esc(initialOf(playlist.name))}</span>
      <span class="pc-name" dir="auto">${esc(playlist.name)}</span>
      <span class="pc-count">${esc(countText(playlist.trackIds.length))}</span>
    </button>`;
  }).join('');

  openModal({
    title: t('action.addToPlaylist'),
    body: `<div style="display:flex;flex-direction:column;gap:2px;max-height:330px;overflow-y:auto">
        ${choices}
        <button class="playlist-choice new" id="new-playlist-choice">${icon('plus')}<span class="pc-name">${esc(t('playlist.newTitle'))}</span></button>
      </div>`,
    onReady: (root) => {
      $$('[data-pick-playlist]', root).forEach((button) => {
        button.addEventListener('click', async () => {
          const playlist = getPlaylist(button.dataset.pickPlaylist);
          if (!playlist) return;
          try {
            const result = await api('/api/playlists/add', {
              method: 'POST',
              body: JSON.stringify({ playlistId: playlist.id, trackIds }),
            });
            closeModal();
            await refreshState();
            render();
            if (result.added > 0) toast(t('toast.addedToPlaylist', { name: playlist.name }), 'success');
          } catch (error) {
            toast(error.message, 'error');
          }
        });
      });
      $('#new-playlist-choice', root).addEventListener('click', () => {
        closeModal();
        openPrompt({
          title: t('playlist.newTitle'),
          placeholder: t('playlist.namePlaceholder'),
          confirmLabel: t('action.create'),
          onConfirm: async (name) => {
            const result = await api('/api/playlists/create', {
              method: 'POST',
              body: JSON.stringify({ name }),
            });
            await api('/api/playlists/add', {
              method: 'POST',
              body: JSON.stringify({ playlistId: result.playlist.id, trackIds }),
            });
            await refreshState();
            render();
            toast(t('toast.playlistCreated'), 'success');
          },
        });
      });
    },
  });
}

function openSongPicker(playlistId) {
  const playlist = getPlaylist(playlistId);
  if (!playlist) return;
  const inPlaylist = new Set(playlist.trackIds);
  const candidates = data.tracks.filter((track) => !inPlaylist.has(track.id));
  const selected = new Set();

  if (!candidates.length) {
    openModal({
      title: t('action.addSongs'),
      body: `<p>${esc(t('playlist.allAdded'))}</p>`,
      footer: `<button class="ghost-btn" data-close>${esc(t('action.close'))}</button>`,
    });
    return;
  }

  const renderChoices = (query = '') => {
    const term = normalizeText(query);
    const visible = candidates.filter((track) => normalizeText(`${track.title} ${track.artist}`).includes(term));
    if (!visible.length) return `<div class="list-empty">${esc(t('library.noResults'))}</div>`;
    return visible.map((track) => `
      <button class="picker-row ${selected.has(track.id) ? 'selected' : ''}" data-pick-track="${esc(track.id)}">
        ${artHtml(track)}
        <span class="pr-text">
          <span class="pr-title" dir="auto">${esc(track.title)}</span>
          <span class="pr-sub" dir="auto">${esc(artistOf(track))}</span>
        </span>
        <span class="picker-check">${icon('check')}</span>
      </button>`).join('');
  };

  openModal({
    title: t('playlist.addSongs'),
    wide: true,
    body: `<input id="picker-search" class="search-input picker-search" placeholder="${esc(t('playlist.searchPlaceholder'))}" dir="auto">
      <div class="picker-list" id="picker-list">${renderChoices()}</div>`,
    footer: `<button class="ghost-btn" data-close>${esc(t('action.cancel'))}</button>
      <button class="primary-btn" id="picker-submit" disabled>${esc(t('playlist.addSelected', { n: '0' }))}</button>`,
    onReady: (root) => {
      const list = $('#picker-list', root);
      const submit = $('#picker-submit', root);
      const updateButton = () => {
        submit.disabled = selected.size === 0;
        submit.textContent = t('playlist.addSelected', { n: num(selected.size) });
      };
      const bindRows = () => {
        $$('[data-pick-track]', root).forEach((button) => {
          button.addEventListener('click', () => {
            const id = button.dataset.pickTrack;
            if (selected.has(id)) selected.delete(id);
            else selected.add(id);
            button.classList.toggle('selected', selected.has(id));
            updateButton();
          });
        });
      };
      const search = $('#picker-search', root);
      search.addEventListener('input', () => {
        list.innerHTML = renderChoices(search.value);
        bindRows();
      });
      bindRows();
      updateButton();
      submit.addEventListener('click', async () => {
        try {
          const result = await api('/api/playlists/add', {
            method: 'POST',
            body: JSON.stringify({ playlistId, trackIds: [...selected] }),
          });
          closeModal();
          await refreshState();
          render();
          const message = result.added === 1
            ? t('playlist.addedOne', { name: playlist.name })
            : t('playlist.addedMany', { n: num(result.added), name: playlist.name });
          toast(message, 'success');
        } catch (error) {
          toast(error.message, 'error');
        }
      });
    },
  });
}

/* ---------------------------------------------------------------- menu --- */

function closeMenu() {
  const root = $('#menu-root');
  if (root) root.innerHTML = '';
  if (ui.menuCloseHandler) {
    document.removeEventListener('mousedown', ui.menuCloseHandler, true);
    ui.menuCloseHandler = null;
  }
}

function showMenu(x, y, items) {
  closeMenu();
  const menu = document.createElement('div');
  menu.className = 'menu';
  menu.innerHTML = items.map((item, index) => {
    if (item.divider) return '<div class="menu-sep"></div>';
    if (item.header) return `<div class="menu-label">${esc(item.header)}</div>`;
    return `<button class="menu-item ${item.danger ? 'danger' : ''}" data-index="${index}">
      ${item.icon ? icon(item.icon) : ''}
      <span>${esc(item.label)}</span>
      ${item.checked ? `<span style="margin-inline-start:auto;color:#ff9fb0">${icon('check')}</span>` : ''}
    </button>`;
  }).join('');
  menu.style.left = '0px';
  menu.style.top = '0px';
  menu.style.visibility = 'hidden';
  $('#menu-root').appendChild(menu);

  const rect = menu.getBoundingClientRect();
  let left = x;
  let top = y;
  if (left + rect.width > window.innerWidth - 10) left = window.innerWidth - rect.width - 10;
  if (left < 10) left = 10;
  if (top + rect.height > window.innerHeight - 10) top = y - rect.height - 12;
  if (top < 10) top = 10;
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  menu.style.visibility = 'visible';

  $$('.menu-item', menu).forEach((button) => {
    button.addEventListener('click', () => {
      const item = items[Number(button.dataset.index)];
      closeMenu();
      if (item?.onClick) item.onClick();
    });
  });

  ui.menuCloseHandler = (event) => {
    if (!event.target.closest('.menu')) closeMenu();
  };
  setTimeout(() => {
    if (ui.menuCloseHandler) document.addEventListener('mousedown', ui.menuCloseHandler, true);
  }, 0);
}

function openImportMenu(anchor) {
  const rect = anchor.getBoundingClientRect();
  showMenu(rect.right - 210, rect.bottom + 6, [
    { label: t('action.importFiles'), icon: 'folder', onClick: () => importMusic('files') },
    { label: t('action.importFolder'), icon: 'music', onClick: () => importMusic('folder') },
  ]);
}

function openSortMenu(anchor) {
  const rect = anchor.getBoundingClientRect();
  const options = ['recent', 'title', 'artist', 'duration'];
  showMenu(rect.right - 200, rect.bottom + 6, options.map((option) => ({
    label: t(`sort.${option}`),
    checked: ui.sort === option,
    onClick: () => {
      ui.sort = option;
      localStorage.setItem('riff.sort', option);
      updateLibraryResults();
      renderSidebar();
      renderView();
    },
  })));
}

function openTrackMenu(id, ctx, anchor) {
  const track = getTrack(id);
  if (!track) return;
  const rect = anchor.getBoundingClientRect();
  const items = [
    { label: t('action.play'), icon: 'play', onClick: () => playContext(ctx, id) },
    { label: t('action.addToPlaylist'), icon: 'plus', onClick: () => openAddToPlaylist([id]) },
  ];
  if (ctx.startsWith('playlist:')) {
    items.push({
      label: t('playlist.removeFromPlaylist'),
      icon: 'close',
      onClick: () => removeFromPlaylist(ctx.slice('playlist:'.length), id),
    });
  }
  items.push({ divider: true });
  items.push({
    label: t('action.showInFinder'),
    icon: 'folder',
    onClick: () => api('/api/track/reveal', { method: 'POST', body: JSON.stringify({ id }) }).catch((error) => toast(error.message, 'error')),
  });
  items.push({
    label: t('action.remove'),
    icon: 'trash',
    danger: true,
    onClick: () => openConfirm({
      title: t('confirm.removeTitle'),
      body: esc(t('confirm.removeBody')),
      confirmLabel: t('action.remove'),
      danger: true,
      onConfirm: () => removeTrackConfirmed(id),
    }),
  });
  showMenu(rect.right - 196, rect.bottom + 6, items);
}

function openPlaylistMenu(id, anchor) {
  const playlist = getPlaylist(id);
  if (!playlist) return;
  const rect = anchor.getBoundingClientRect();
  showMenu(rect.right - 196, rect.bottom + 6, [
    { label: t('action.playAll'), icon: 'play', onClick: () => playPlaylist(id) },
    { label: t('action.addSongs'), icon: 'plus', onClick: () => openSongPicker(id) },
    { divider: true },
    {
      label: t('action.rename'),
      icon: 'pencil',
      onClick: () => openPrompt({
        title: t('playlist.renameTitle'),
        value: playlist.name,
        placeholder: t('playlist.namePlaceholder'),
        confirmLabel: t('action.save'),
        onConfirm: async (name) => {
          await api('/api/playlists/rename', {
            method: 'POST',
            body: JSON.stringify({ id, name }),
          });
          await refreshState();
          render();
          toast(t('toast.playlistRenamed'), 'success');
        },
      }),
    },
    {
      label: t('action.delete'),
      icon: 'trash',
      danger: true,
      onClick: () => openConfirm({
        title: t('playlist.deleteTitle'),
        body: esc(t('playlist.deleteBody', { name: playlist.name })),
        confirmLabel: t('action.delete'),
        danger: true,
        onConfirm: () => deletePlaylist(id),
      }),
    },
  ]);
}

function openLanguageMenu(anchor) {
  const rect = anchor.getBoundingClientRect();
  showMenu(rect.left, rect.top - 4, [
    { label: t('settings.auto'), checked: data.settings.language === 'auto', onClick: () => setLanguage('auto') },
    { label: 'English', checked: data.settings.language === 'en', onClick: () => setLanguage('en') },
    { label: 'العربية', checked: data.settings.language === 'ar', onClick: () => setLanguage('ar') },
    { label: '日本語', checked: data.settings.language === 'ja', onClick: () => setLanguage('ja') },
  ]);
}

/* --------------------------------------------------------------- toast --- */

function toast(message, kind = 'info') {
  if (!message) return;
  const root = $('#toast-root');
  if (!root) return;
  const element = document.createElement('div');
  element.className = `toast ${kind}`;
  element.innerHTML = `<span class="dot-indicator"></span><span>${esc(message)}</span>`;
  root.appendChild(element);
  while (root.children.length > 3) root.removeChild(root.firstChild);
  setTimeout(() => {
    element.classList.add('out');
    setTimeout(() => element.remove(), 260);
  }, kind === 'error' ? 4400 : 3200);
}

/* ------------------------------------------------------------- actions --- */

function handleAction(action, dataset, element) {
  switch (action) {
    case 'import-menu': openImportMenu(element); break;
    case 'import-files': importMusic('files'); break;
    case 'import-folder': importMusic('folder'); break;
    case 'sort-menu': openSortMenu(element); break;
    case 'play-row': playContext(dataset.ctx || 'library', dataset.id); break;
    case 'play-id': playId(dataset.id); break;
    case 'track-add': openAddToPlaylist([dataset.id]); break;
    case 'track-more': openTrackMenu(dataset.id, dataset.ctx || 'library', element); break;
    case 'playlist-menu': openPlaylistMenu(dataset.id, element); break;
    case 'new-playlist':
      openPrompt({
        title: t('playlist.newTitle'),
        placeholder: t('playlist.namePlaceholder'),
        confirmLabel: t('action.create'),
        onConfirm: (name) => createPlaylist(name, async (playlist) => {
          openPlaylist(playlist.id);
        }),
      });
      break;
    case 'playlist-play': playPlaylist(dataset.id); break;
    case 'playlist-shuffle': playPlaylist(dataset.id, true); break;
    case 'add-songs': openSongPicker(dataset.id); break;
    case 'set-language': setLanguage(dataset.lang); break;
    case 'set-format': setFormat(dataset.format); break;
    case 'set-quality': setQuality(dataset.quality); break;
    case 'fetch-info': fetchLinkInfo(); break;
    case 'download-start': startDownload(); break;
    case 'cancel-download': cancelDownload(); break;
    case 'retry-download': retryDownload(data.job?.id || null); break;
    case 'queue-cancel': cancelQueueItem(dataset.id); break;
    case 'queue-retry': retryDownload(dataset.id); break;
    case 'queue-remove': removeQueueItem(dataset.id); break;
    case 'retry-all': retryAllDownloads(); break;
    case 'clear-finished': clearFinishedDownloads(); break;
    case 'paste': pasteLink(); break;
    case 'choose-folder': chooseDownloadFolder(); break;
    case 'open-downloads': api('/api/open', { method: 'POST', body: JSON.stringify({ target: 'downloads' }) }).catch((error) => toast(error.message, 'error')); break;
    case 'open-data': api('/api/open', { method: 'POST', body: JSON.stringify({ target: 'data' }) }).catch((error) => toast(error.message, 'error')); break;
    case 'reveal-track': api('/api/track/reveal', { method: 'POST', body: JSON.stringify({ id: dataset.id }) }).catch((error) => toast(error.message, 'error')); break;
    case 'language-menu': openLanguageMenu(element); break;
    default: break;
  }
}

/* ------------------------------------------------------------- events --- */

function bindEvents() {
  const titlebar = $('#titlebar');
  titlebar?.addEventListener('mousedown', (event) => {
    if (event.button !== 0) return;
    if (window.ipc?.postMessage) window.ipc.postMessage('drag');
  });

  $('#btn-play')?.addEventListener('click', togglePlay);
  $('#btn-next')?.addEventListener('click', () => nextTrack(false));
  $('#btn-prev')?.addEventListener('click', previousTrack);
  $('#btn-shuffle')?.addEventListener('click', toggleShuffle);
  $('#btn-repeat')?.addEventListener('click', cycleRepeat);
  $('#btn-mute')?.addEventListener('click', toggleMute);
  $('#language-btn')?.addEventListener('click', (event) => openLanguageMenu(event.currentTarget));
  $('#new-playlist')?.addEventListener('click', () => {
    openPrompt({
      title: t('playlist.newTitle'),
      placeholder: t('playlist.namePlaceholder'),
      confirmLabel: t('action.create'),
      onConfirm: (name) => createPlaylist(name, async (playlist) => {
        openPlaylist(playlist.id);
      }),
    });
  });

  const seek = $('#seek');
  seek?.addEventListener('input', () => {
    player.seeking = true;
    const duration = getDuration();
    player.seekPreview = (Number(seek.value) / 1000) * duration;
    updateProgress();
  });
  seek?.addEventListener('change', () => {
    const duration = getDuration();
    if (duration > 0) {
      audio.currentTime = Math.min(duration, Math.max(0, (Number(seek.value) / 1000) * duration));
    }
    player.seeking = false;
    updateProgress();
  });

  const volume = $('#volume');
  volume?.addEventListener('input', () => setVolume(Number(volume.value) / 100));

  document.addEventListener('click', (event) => {
    const close = event.target.closest('[data-close]');
    if (close) {
      closeModal();
      return;
    }
    const act = event.target.closest('[data-act]');
    if (act) {
      event.preventDefault();
      handleAction(act.dataset.act, act.dataset, act);
      return;
    }
    const nav = event.target.closest('[data-nav]');
    if (nav) {
      navigate(nav.dataset.nav);
      return;
    }
    const playlist = event.target.closest('[data-open-playlist]');
    if (playlist) {
      openPlaylist(playlist.dataset.openPlaylist);
      return;
    }
    const card = event.target.closest('.card');
    if (card) {
      playContext('library', card.dataset.id);
      return;
    }
    const row = event.target.closest('.track-row');
    if (row) {
      playContext(row.dataset.ctx || 'library', row.dataset.id);
    }
  });

  document.addEventListener('contextmenu', (event) => {
    const playlist = event.target.closest('[data-open-playlist]');
    if (playlist) {
      event.preventDefault();
      openPlaylistMenu(playlist.dataset.openPlaylist, playlist);
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target.id === 'search-input') {
      ui.search = event.target.value;
      updateLibraryResults();
    }
    if (event.target.id === 'url-input') {
      ui.url = event.target.value;
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      closeModal();
      return;
    }

    const target = event.target;
    const editing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName) || target?.isContentEditable;

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'f') {
      event.preventDefault();
      if (!['library', 'playlist'].includes(ui.view)) navigate('library');
      setTimeout(() => $('#search-input')?.focus(), 30);
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'i') {
      event.preventDefault();
      importMusic('files');
      return;
    }
    if (event.target.id === 'url-input' && event.key === 'Enter') {
      event.preventDefault();
      fetchLinkInfo();
      return;
    }
    if (editing) return;

    if (event.key === ' ') {
      event.preventDefault();
      togglePlay();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      seekBy(5);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      seekBy(-5);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setVolume(player.volume + 0.05);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setVolume(player.volume - 0.05);
    } else if (event.key.toLowerCase() === 'm') {
      toggleMute();
    } else if (event.key.toLowerCase() === 'n') {
      nextTrack(false);
    } else if (event.key.toLowerCase() === 'p') {
      previousTrack();
    }
  });

  window.addEventListener('scroll', closeMenu, true);

  audio.addEventListener('volumechange', () => {
    player.volume = audio.volume;
    renderPlayer();
  });
}

function startPolling() {
  setInterval(async () => {
    if (document.hidden) return;
    try {
      const state = await api('/api/state');
      if (state.notice) handleNotice(state.notice);
      if (state.rev !== data.rev) {
        data.rev = state.rev;
        data.tracks = state.tracks || [];
        data.playlists = state.playlists || [];
        data.settings = state.settings || data.settings;
        data.tools = state.tools || {};
        data.paths = state.paths || {};
        data.version = state.version || data.version;
        data.job = state.job || data.job;
        ui.lang = resolveLang();
        render();
      }
    } catch {
      /* offline or shutting down */
    }
  }, 2400);

  setInterval(pollJob, 800);
}

/* ---------------------------------------------------------------- boot --- */

async function boot() {
  const savedVolume = Number.parseFloat(localStorage.getItem('riff.volume'));
  if (Number.isFinite(savedVolume)) {
    player.volume = Math.min(1, Math.max(0, savedVolume));
  }
  audio.volume = player.volume;
  bindEvents();
  applyLanguage();

  try {
    await refreshState();
  } catch (error) {
    console.error(error);
    toast(t('toast.error'), 'error');
  }

  applyLanguage();
  render({ scrollTop: true, animate: true });
  startPolling();

  window.__riffRefresh = async () => {
    await refreshState();
    render();
  };
}

document.addEventListener('DOMContentLoaded', boot);
