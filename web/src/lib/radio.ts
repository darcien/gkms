import stats from '../../../stats.json' with { type: 'json' };
import refinedAllMedia from '../../../refined_all_media.json' with { type: 'json' };

export const colorBySlug = {
	aochan: '#FF4F63',
	bambi: '#26B4EB',
	pikarun: '#FFD200',
	mugichan: '#C45DC8',
	iwachan: '#D2E3E4',
	hamu: '#FE8A22',
	myachan: '#92DE5A',
	kawachimura: '#00BED8',
	mashipi: '#FFAC26',
	nonsan: '#6EA3FC',
	aaya: '#F74B2A',
	suuchan: '#FD7EC2'
};

export const radioLastFetchedAt = refinedAllMedia.metadata.updatedAt;

export { stats };
